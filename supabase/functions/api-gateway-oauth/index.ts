import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';
import { create, verify } from 'https://deno.land/x/djwt@v2.8/mod.ts';
import { crypto } from 'https://deno.land/std@0.168.0/crypto/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// OAuth2 Authorization Code Flow
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname;

  // Initialize Supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    if (path === '/authorize' && req.method === 'GET') {
      return handleAuthorize(req, supabase);
    } else if (path === '/token' && req.method === 'POST') {
      return handleTokenExchange(req, supabase);
    } else if (path === '/revoke' && req.method === 'POST') {
      return handleTokenRevoke(req, supabase);
    } else if (path === '/applications' && req.method === 'POST') {
      return handleCreateApplication(req, supabase);
    } else if (path === '/applications' && req.method === 'GET') {
      return handleListApplications(req, supabase);
    } else {
      return new Response(
        JSON.stringify({ error: 'Not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('OAuth API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleAuthorize(req: Request, supabase: any) {
  const url = new URL(req.url);
  const clientId = url.searchParams.get('client_id');
  const redirectUri = url.searchParams.get('redirect_uri');
  const scope = url.searchParams.get('scope') || 'read';
  const state = url.searchParams.get('state');
  const responseType = url.searchParams.get('response_type');
  const codeChallenge = url.searchParams.get('code_challenge');
  const codeChallengeMethod = url.searchParams.get('code_challenge_method');

  if (!clientId || !redirectUri || responseType !== 'code') {
    return new Response(
      JSON.stringify({ error: 'Invalid request parameters' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Validate application
  const { data: app, error: appError } = await supabase
    .from('oauth_applications')
    .select('*')
    .eq('client_id', clientId)
    .eq('is_active', true)
    .single();

  if (appError || !app) {
    return new Response(
      JSON.stringify({ error: 'Invalid client_id' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Validate redirect URI
  if (!app.redirect_uris.includes(redirectUri)) {
    return new Response(
      JSON.stringify({ error: 'Invalid redirect_uri' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Generate authorization code
  const authCode = generateSecureToken();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Store authorization code temporarily with PKCE support
  const { error: codeError } = await supabase
    .from('oauth_authorization_codes')
    .insert({
      code: authCode,
      application_id: app.id,
      user_id: null, // Will be set during actual auth flow
      redirect_uri: redirectUri,
      scope: scope.split(' '),
      state: state,
      expires_at: expiresAt.toISOString(),
      code_challenge: codeChallenge,
      code_challenge_method: codeChallengeMethod || 'plain'
    });

  if (codeError) {
    console.error('Failed to store auth code:', codeError);
    return new Response(
      JSON.stringify({ error: 'Failed to generate authorization code' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Return authorization response
  const authUrl = new URL(redirectUri);
  authUrl.searchParams.set('code', authCode);
  if (state) authUrl.searchParams.set('state', state);

  return new Response(
    JSON.stringify({
      authorization_url: authUrl.toString(),
      code: authCode,
      state: state
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleTokenExchange(req: Request, supabase: any) {
  const body = await req.json();
  const { grant_type, code, client_id, client_secret, redirect_uri, refresh_token, code_verifier } = body;

  if (grant_type === 'authorization_code') {
    return handleAuthorizationCodeGrant(code, client_id, client_secret, redirect_uri, code_verifier, supabase);
  } else if (grant_type === 'refresh_token') {
    return handleRefreshTokenGrant(refresh_token, client_id, client_secret, supabase);
  } else {
    return new Response(
      JSON.stringify({ error: 'unsupported_grant_type' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleAuthorizationCodeGrant(code: string, clientId: string, clientSecret: string, redirectUri: string, codeVerifier: string, supabase: any) {
  // Validate application
  const { data: app, error: appError } = await supabase
    .from('oauth_applications')
    .select('*')
    .eq('client_id', clientId)
    .eq('client_secret', clientSecret)
    .eq('is_active', true)
    .single();

  if (appError || !app) {
    return new Response(
      JSON.stringify({ error: 'invalid_client' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Validate and consume authorization code
  const { data: authCode, error: codeError } = await supabase
    .from('oauth_authorization_codes')
    .select('*')
    .eq('code', code)
    .eq('application_id', app.id)
    .eq('redirect_uri', redirectUri)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (codeError || !authCode) {
    return new Response(
      JSON.stringify({ error: 'invalid_grant' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Verify PKCE challenge if present
  if (authCode.code_challenge && authCode.code_challenge_method) {
    if (!codeVerifier) {
      return new Response(
        JSON.stringify({ error: 'code_verifier required for PKCE' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const isValidChallenge = await verifyPKCE(
      codeVerifier, 
      authCode.code_challenge, 
      authCode.code_challenge_method
    );

    if (!isValidChallenge) {
      return new Response(
        JSON.stringify({ error: 'invalid_code_verifier' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }

  // Delete used authorization code
  await supabase
    .from('oauth_authorization_codes')
    .delete()
    .eq('code', code);

  // Generate access and refresh tokens
  const accessToken = generateSecureToken();
  const refreshTokenValue = generateSecureToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Store tokens
  const { error: tokenError } = await supabase
    .from('oauth_tokens')
    .insert({
      application_id: app.id,
      user_id: authCode.user_id || app.owner_user_id, // Default to app owner if no specific user
      access_token: accessToken,
      refresh_token: refreshTokenValue,
      scopes: authCode.scope,
      expires_at: expiresAt.toISOString()
    });

  if (tokenError) {
    console.error('Failed to store tokens:', tokenError);
    return new Response(
      JSON.stringify({ error: 'server_error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({
      access_token: accessToken,
      refresh_token: refreshTokenValue,
      token_type: 'Bearer',
      expires_in: 86400,
      scope: authCode.scope.join(' ')
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleRefreshTokenGrant(refreshToken: string, clientId: string, clientSecret: string, supabase: any) {
  // Validate application
  const { data: app, error: appError } = await supabase
    .from('oauth_applications')
    .select('*')
    .eq('client_id', clientId)
    .eq('client_secret', clientSecret)
    .eq('is_active', true)
    .single();

  if (appError || !app) {
    return new Response(
      JSON.stringify({ error: 'invalid_client' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Validate refresh token
  const { data: token, error: tokenError } = await supabase
    .from('oauth_tokens')
    .select('*')
    .eq('refresh_token', refreshToken)
    .eq('application_id', app.id)
    .is('revoked_at', null)
    .single();

  if (tokenError || !token) {
    return new Response(
      JSON.stringify({ error: 'invalid_grant' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Generate new access token
  const newAccessToken = generateSecureToken();
  const newRefreshToken = generateSecureToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Update token
  const { error: updateError } = await supabase
    .from('oauth_tokens')
    .update({
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      expires_at: expiresAt.toISOString()
    })
    .eq('id', token.id);

  if (updateError) {
    return new Response(
      JSON.stringify({ error: 'server_error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      token_type: 'Bearer',
      expires_in: 86400,
      scope: token.scopes.join(' ')
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleTokenRevoke(req: Request, supabase: any) {
  const body = await req.json();
  const { token, client_id, client_secret } = body;

  // Validate application
  const { data: app, error: appError } = await supabase
    .from('oauth_applications')
    .select('*')
    .eq('client_id', client_id)
    .eq('client_secret', client_secret)
    .single();

  if (appError || !app) {
    return new Response(
      JSON.stringify({ error: 'invalid_client' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Revoke token
  await supabase
    .from('oauth_tokens')
    .update({ revoked_at: new Date().toISOString() })
    .or(`access_token.eq.${token},refresh_token.eq.${token}`)
    .eq('application_id', app.id);

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleCreateApplication(req: Request, supabase: any) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Authorization required' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Get user from auth token
  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return new Response(
      JSON.stringify({ error: 'Invalid token' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const body = await req.json();
  const { name, description, platform_type, redirect_uris, scopes } = body;

  const clientId = generateSecureToken();
  const clientSecret = generateSecureToken();

  const { data, error } = await supabase
    .from('oauth_applications')
    .insert({
      name,
      description,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uris: redirect_uris || [],
      scopes: scopes || ['read'],
      platform_type,
      owner_user_id: user.id
    })
    .select()
    .single();

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create application' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleListApplications(req: Request, supabase: any) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Authorization required' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return new Response(
      JSON.stringify({ error: 'Invalid token' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const { data, error } = await supabase
    .from('oauth_applications')
    .select('id, name, description, client_id, platform_type, is_active, created_at')
    .eq('owner_user_id', user.id);

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch applications' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

function generateSecureToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function verifyPKCE(codeVerifier: string, codeChallenge: string, method: string): Promise<boolean> {
  try {
    if (method === 'plain') {
      return codeVerifier === codeChallenge;
    } else if (method === 'S256') {
      const encoder = new TextEncoder();
      const data = encoder.encode(codeVerifier);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashBase64 = btoa(String.fromCharCode(...hashArray))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
      return hashBase64 === codeChallenge;
    }
    return false;
  } catch (error) {
    console.error('PKCE verification error:', error);
    return false;
  }
}
