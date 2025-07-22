import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';
import { crypto } from 'https://deno.land/std@0.168.0/crypto/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname;

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Authenticate request
    const authResult = await authenticateRequest(req, supabase);
    if (authResult.error) {
      return authResult.response;
    }

    const { application, user } = authResult;

    if (path === '/subscriptions' && req.method === 'POST') {
      return handleCreateSubscription(req, application, supabase);
    } else if (path === '/subscriptions' && req.method === 'GET') {
      return handleListSubscriptions(req, application, supabase);
    } else if (path.startsWith('/subscriptions/') && req.method === 'PUT') {
      const subscriptionId = path.split('/')[2];
      return handleUpdateSubscription(req, subscriptionId, application, supabase);
    } else if (path.startsWith('/subscriptions/') && req.method === 'DELETE') {
      const subscriptionId = path.split('/')[2];
      return handleDeleteSubscription(subscriptionId, application, supabase);
    } else if (path === '/test' && req.method === 'POST') {
      return handleTestWebhook(req, application, supabase);
    } else if (path === '/deliveries' && req.method === 'GET') {
      return handleListDeliveries(req, application, supabase);
    } else if (path === '/trigger' && req.method === 'POST') {
      return handleTriggerWebhook(req, supabase);
    } else {
      return new Response(
        JSON.stringify({ error: 'Not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Webhook manager error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function authenticateRequest(req: Request, supabase: any) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      error: true,
      response: new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    };
  }

  const accessToken = authHeader.replace('Bearer ', '');

  // Validate OAuth token
  const { data: token, error: tokenError } = await supabase
    .from('oauth_tokens')
    .select(`
      *,
      oauth_applications (*)
    `)
    .eq('access_token', accessToken)
    .gt('expires_at', new Date().toISOString())
    .is('revoked_at', null)
    .single();

  if (tokenError || !token) {
    return {
      error: true,
      response: new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    };
  }

  return {
    error: false,
    application: token.oauth_applications,
    user: { id: token.user_id },
    token: token
  };
}

async function handleCreateSubscription(req: Request, application: any, supabase: any) {
  const body = await req.json();
  const { endpoint_url, event_types, description } = body;

  if (!endpoint_url || !event_types || !Array.isArray(event_types)) {
    return new Response(
      JSON.stringify({ error: 'endpoint_url and event_types array are required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Generate webhook secret
  const secretKey = generateSecureToken();

  const { data, error } = await supabase
    .from('webhook_subscriptions')
    .insert({
      application_id: application.id,
      endpoint_url,
      event_types,
      secret_key: secretKey,
      description
    })
    .select()
    .single();

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create webhook subscription' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({
      ...data,
      secret_key: secretKey // Return secret only once during creation
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleListSubscriptions(req: Request, application: any, supabase: any) {
  const { data, error } = await supabase
    .from('webhook_subscriptions')
    .select('id, endpoint_url, event_types, is_active, created_at, updated_at, description')
    .eq('application_id', application.id);

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch webhook subscriptions' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleUpdateSubscription(req: Request, subscriptionId: string, application: any, supabase: any) {
  const body = await req.json();
  const { endpoint_url, event_types, is_active, description } = body;

  const updateData: any = { updated_at: new Date().toISOString() };
  if (endpoint_url) updateData.endpoint_url = endpoint_url;
  if (event_types) updateData.event_types = event_types;
  if (typeof is_active === 'boolean') updateData.is_active = is_active;
  if (description !== undefined) updateData.description = description;

  const { data, error } = await supabase
    .from('webhook_subscriptions')
    .update(updateData)
    .eq('id', subscriptionId)
    .eq('application_id', application.id)
    .select()
    .single();

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update webhook subscription' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleDeleteSubscription(subscriptionId: string, application: any, supabase: any) {
  const { error } = await supabase
    .from('webhook_subscriptions')
    .delete()
    .eq('id', subscriptionId)
    .eq('application_id', application.id);

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to delete webhook subscription' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleTestWebhook(req: Request, application: any, supabase: any) {
  const body = await req.json();
  const { subscription_id, test_payload } = body;

  if (!subscription_id) {
    return new Response(
      JSON.stringify({ error: 'subscription_id is required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Get subscription details
  const { data: subscription, error } = await supabase
    .from('webhook_subscriptions')
    .select('*')
    .eq('id', subscription_id)
    .eq('application_id', application.id)
    .single();

  if (error || !subscription) {
    return new Response(
      JSON.stringify({ error: 'Webhook subscription not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const testEvent = {
    event_type: 'webhook.test',
    timestamp: new Date().toISOString(),
    data: test_payload || { message: 'This is a test webhook' },
    application_id: application.id
  };

  try {
    const result = await deliverWebhook(subscription, testEvent, supabase);
    return new Response(
      JSON.stringify({
        success: result.success,
        status_code: result.status_code,
        response_body: result.response_body,
        delivery_time_ms: result.delivery_time_ms
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to deliver test webhook' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleListDeliveries(req: Request, application: any, supabase: any) {
  const url = new URL(req.url);
  const subscriptionId = url.searchParams.get('subscription_id');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = parseInt(url.searchParams.get('offset') || '0');

  let query = supabase
    .from('webhook_deliveries')
    .select(`
      *,
      webhook_subscriptions!inner(application_id)
    `)
    .eq('webhook_subscriptions.application_id', application.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (subscriptionId) {
    query = query.eq('subscription_id', subscriptionId);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch webhook deliveries' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleTriggerWebhook(req: Request, supabase: any) {
  const body = await req.json();
  const { event_type, data, application_id } = body;

  if (!event_type || !application_id) {
    return new Response(
      JSON.stringify({ error: 'event_type and application_id are required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Get all active subscriptions for this application that listen to this event
  const { data: subscriptions, error } = await supabase
    .from('webhook_subscriptions')
    .select('*')
    .eq('application_id', application_id)
    .eq('is_active', true)
    .contains('event_types', [event_type]);

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch webhook subscriptions' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const event = {
    event_type,
    timestamp: new Date().toISOString(),
    data,
    application_id
  };

  // Deliver to all matching subscriptions
  const deliveryPromises = subscriptions.map(subscription => 
    deliverWebhook(subscription, event, supabase)
  );

  const results = await Promise.allSettled(deliveryPromises);
  const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;

  return new Response(
    JSON.stringify({
      triggered: subscriptions.length,
      successful: successful,
      failed: subscriptions.length - successful
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function deliverWebhook(subscription: any, event: any, supabase: any, attempt: number = 1): Promise<any> {
  const startTime = Date.now();
  
  try {
    // Create HMAC signature
    const signature = await createHMACSignature(JSON.stringify(event), subscription.secret_key);
    
    const response = await fetch(subscription.endpoint_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'X-Webhook-Event': event.event_type,
        'X-Webhook-Timestamp': event.timestamp,
        'User-Agent': 'EchoSelf-Webhooks/1.0'
      },
      body: JSON.stringify(event)
    });

    const responseBody = await response.text();
    const deliveryTime = Date.now() - startTime;

    // Log delivery
    await supabase
      .from('webhook_deliveries')
      .insert({
        subscription_id: subscription.id,
        event_type: event.event_type,
        payload: event,
        response_status: response.status,
        response_body: responseBody.substring(0, 1000), // Limit response body size
        attempt_count: attempt,
        delivered_at: response.ok ? new Date().toISOString() : null
      });

    return {
      success: response.ok,
      status_code: response.status,
      response_body: responseBody,
      delivery_time_ms: deliveryTime
    };

  } catch (error) {
    console.error('Webhook delivery error:', error);
    
    // Log failed delivery
    await supabase
      .from('webhook_deliveries')
      .insert({
        subscription_id: subscription.id,
        event_type: event.event_type,
        payload: event,
        response_status: 0,
        response_body: error.message,
        attempt_count: attempt,
        delivered_at: null
      });

    return {
      success: false,
      status_code: 0,
      response_body: error.message,
      delivery_time_ms: Date.now() - startTime
    };
  }
}

async function createHMACSignature(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const payloadData = encoder.encode(payload);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, payloadData);
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return `sha256=${hashHex}`;
}

function generateSecureToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}