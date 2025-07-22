import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Main API Gateway for external platforms to interact with EchoSelf
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

  // Log request for analytics and rate limiting
  const startTime = Date.now();
  let response: Response;
  let application: any = null;
  let user: any = null;

  try {
    // Authenticate request
    const authResult = await authenticateRequest(req, supabase);
    if (authResult.error) {
      return authResult.response;
    }
    application = authResult.application;
    user = authResult.user;

    // Check rate limiting
    const rateLimitResult = await checkRateLimit(application, supabase);
    if (rateLimitResult.error) {
      return rateLimitResult.response;
    }

    // Route requests
    if (path === '/echo/chat' && req.method === 'POST') {
      response = await handleEchoChat(req, user, application, supabase);
    } else if (path === '/echo/profile' && req.method === 'GET') {
      response = await handleGetEchoProfile(req, user, application, supabase);
    } else if (path === '/echo/behavioral-data' && req.method === 'POST') {
      response = await handleSubmitBehavioralData(req, user, application, supabase);
    } else if (path === '/integrations' && req.method === 'GET') {
      response = await handleListIntegrations(req, user, application, supabase);
    } else if (path === '/integrations' && req.method === 'POST') {
      response = await handleCreateIntegration(req, user, application, supabase);
    } else if (path.startsWith('/platforms/')) {
      response = await handlePlatformSpecificRequest(req, path, user, application, supabase);
    } else {
      response = new Response(
        JSON.stringify({ error: 'Endpoint not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('API Gateway error:', error);
    response = new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Log the request
  await logRequest(req, response, application, user, startTime, supabase);

  return response;
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

async function checkRateLimit(application: any, supabase: any) {
  // Get application's rate limit tier
  const { data: tier, error: tierError } = await supabase
    .from('rate_limit_tiers')
    .select('*')
    .eq('id', application.rate_limit_tier_id)
    .single();

  if (tierError || !tier) {
    // Default to free tier limits if no tier found
    tier = { requests_per_hour: 1000, burst_limit: 100 };
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
  
  // Check hourly limit
  const { data: hourlyRequests, error: hourlyError } = await supabase
    .from('api_gateway_logs')
    .select('id')
    .eq('application_id', application.id)
    .gte('created_at', oneHourAgo);

  if (hourlyError) {
    console.error('Rate limit check error:', hourlyError);
    return { error: false }; // Allow request on error
  }

  if (hourlyRequests.length >= tier.requests_per_hour) {
    return {
      error: true,
      response: new Response(
        JSON.stringify({ 
          error: 'Hourly rate limit exceeded',
          limit: tier.requests_per_hour,
          tier: tier.name,
          reset_time: new Date(Date.now() + 60 * 60 * 1000).toISOString()
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': tier.requests_per_hour.toString(),
            'X-RateLimit-Remaining': Math.max(0, tier.requests_per_hour - hourlyRequests.length).toString(),
            'X-RateLimit-Reset': Math.floor((Date.now() + 60 * 60 * 1000) / 1000).toString(),
            'X-RateLimit-Tier': tier.name
          }
        }
      )
    };
  }

  // Check burst limit (requests per minute)
  const { data: burstRequests, error: burstError } = await supabase
    .from('api_gateway_logs')
    .select('id')
    .eq('application_id', application.id)
    .gte('created_at', oneMinuteAgo);

  if (burstError) {
    console.error('Burst limit check error:', burstError);
    return { error: false };
  }

  if (burstRequests.length >= tier.burst_limit) {
    return {
      error: true,
      response: new Response(
        JSON.stringify({ 
          error: 'Burst rate limit exceeded',
          burst_limit: tier.burst_limit,
          tier: tier.name,
          reset_time: new Date(Date.now() + 60 * 1000).toISOString()
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'X-RateLimit-Burst-Limit': tier.burst_limit.toString(),
            'X-RateLimit-Burst-Remaining': Math.max(0, tier.burst_limit - burstRequests.length).toString(),
            'X-RateLimit-Burst-Reset': Math.floor((Date.now() + 60 * 1000) / 1000).toString(),
            'X-RateLimit-Tier': tier.name
          }
        }
      )
    };
  }

  return { error: false };
}

async function handleEchoChat(req: Request, user: any, application: any, supabase: any) {
  const body = await req.json();
  const { message, context, platform_format } = body;

  if (!message) {
    return new Response(
      JSON.stringify({ error: 'Message is required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Call the existing chat-with-echo function
  const chatResponse = await supabase.functions.invoke('chat-with-echo', {
    body: { message, userId: user.id }
  });

  if (chatResponse.error) {
    return new Response(
      JSON.stringify({ error: 'Failed to get Echo response' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const echoResponse = chatResponse.data.response;

  // Format response based on platform
  const formattedResponse = formatResponseForPlatform(echoResponse, application.platform_type, platform_format);

  return new Response(
    JSON.stringify({
      response: formattedResponse,
      metadata: {
        user_id: user.id,
        timestamp: new Date().toISOString(),
        platform: application.platform_type,
        context: context
      }
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleGetEchoProfile(req: Request, user: any, application: any, supabase: any) {
  // Get user's twin data
  const { data: twin, error: twinError } = await supabase
    .from('twins')
    .select('data')
    .eq('user_id', user.id)
    .single();

  if (twinError) {
    return new Response(
      JSON.stringify({ error: 'Echo profile not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Return public profile data only
  const publicProfile = {
    communication_style: twin.data?.communication_style || 'neutral',
    personality_traits: twin.data?.personality_traits || [],
    interests: twin.data?.interests || [],
    platform_preferences: twin.data?.platform_preferences || {},
    created_at: twin.data?.created_at,
    last_updated: twin.data?.updated_at
  };

  return new Response(
    JSON.stringify(publicProfile),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleSubmitBehavioralData(req: Request, user: any, application: any, supabase: any) {
  const body = await req.json();
  const { data_type, data_value, platform_context } = body;

  if (!data_type || !data_value) {
    return new Response(
      JSON.stringify({ error: 'data_type and data_value are required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Store behavioral data
  const { error } = await supabase
    .from('behavioral_data')
    .insert({
      user_id: user.id,
      data_type: data_type,
      data_value: {
        ...data_value,
        source: 'api_gateway',
        application_id: application.id,
        platform_context: platform_context
      },
      timestamp: new Date().toISOString()
    });

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to store behavioral data' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, message: 'Behavioral data stored successfully' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleListIntegrations(req: Request, user: any, application: any, supabase: any) {
  const { data: integrations, error } = await supabase
    .from('platform_integrations')
    .select('id, platform_type, platform_username, is_active, last_sync_at, created_at')
    .eq('user_id', user.id)
    .eq('is_active', true);

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch integrations' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify(integrations),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleCreateIntegration(req: Request, user: any, application: any, supabase: any) {
  const body = await req.json();
  const { platform_type, platform_user_id, platform_username, integration_data } = body;

  const { data, error } = await supabase
    .from('platform_integrations')
    .insert({
      user_id: user.id,
      platform_type,
      platform_user_id,
      platform_username,
      integration_data: integration_data || {}
    })
    .select()
    .single();

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create integration' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handlePlatformSpecificRequest(req: Request, path: string, user: any, application: any, supabase: any) {
  const pathParts = path.split('/');
  const platform = pathParts[2]; // /platforms/{platform}/...
  const action = pathParts[3];

  switch (platform) {
    case 'email':
      return handleEmailPlatform(req, action, user, application, supabase);
    case 'slack':
      return handleSlackPlatform(req, action, user, application, supabase);
    case 'discord':
      return handleDiscordPlatform(req, action, user, application, supabase);
    default:
      return new Response(
        JSON.stringify({ error: 'Platform not supported' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
  }
}

async function handleEmailPlatform(req: Request, action: string, user: any, application: any, supabase: any) {
  if (action === 'compose' && req.method === 'POST') {
    const body = await req.json();
    const { recipient, subject, context } = body;

    // Generate email response using Echo
    const chatResponse = await supabase.functions.invoke('chat-with-echo', {
      body: { 
        message: `Compose an email to ${recipient} with subject "${subject}". Context: ${context}`,
        userId: user.id 
      }
    });

    if (chatResponse.error) {
      return new Response(
        JSON.stringify({ error: 'Failed to generate email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        email: {
          to: recipient,
          subject: subject,
          body: chatResponse.data.response,
          format: 'text'
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ error: 'Action not supported' }),
    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleSlackPlatform(req: Request, action: string, user: any, application: any, supabase: any) {
  if (action === 'message' && req.method === 'POST') {
    const body = await req.json();
    const { channel, thread_ts, context } = body;

    const chatResponse = await supabase.functions.invoke('chat-with-echo', {
      body: { 
        message: `Respond in Slack channel ${channel}. Context: ${context}`,
        userId: user.id 
      }
    });

    if (chatResponse.error) {
      return new Response(
        JSON.stringify({ error: 'Failed to generate message' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        slack_message: {
          channel: channel,
          text: chatResponse.data.response,
          thread_ts: thread_ts
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ error: 'Action not supported' }),
    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleDiscordPlatform(req: Request, action: string, user: any, application: any, supabase: any) {
  if (action === 'message' && req.method === 'POST') {
    const body = await req.json();
    const { channel_id, context } = body;

    const chatResponse = await supabase.functions.invoke('chat-with-echo', {
      body: { 
        message: `Respond in Discord channel. Context: ${context}`,
        userId: user.id 
      }
    });

    if (chatResponse.error) {
      return new Response(
        JSON.stringify({ error: 'Failed to generate message' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        discord_message: {
          channel_id: channel_id,
          content: chatResponse.data.response
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ error: 'Action not supported' }),
    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

function formatResponseForPlatform(response: string, platformType: string, customFormat?: string) {
  if (customFormat) {
    return response; // Custom formatting handled by client
  }

  switch (platformType) {
    case 'email':
      return {
        subject: 'Response from EchoSelf',
        body: response,
        format: 'text'
      };
    case 'chat':
      return {
        message: response,
        type: 'text'
      };
    case 'social':
      return {
        content: response.length > 280 ? response.substring(0, 277) + '...' : response,
        hashtags: extractHashtags(response)
      };
    default:
      return response;
  }
}

function extractHashtags(text: string): string[] {
  const hashtags = text.match(/#[\w]+/g);
  return hashtags || [];
}

async function logRequest(req: Request, response: Response, application: any, user: any, startTime: number, supabase: any) {
  try {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const url = new URL(req.url);
    
    // Log the request
    await supabase
      .from('api_gateway_logs')
      .insert({
        application_id: application?.id,
        user_id: user?.id,
        endpoint: url.pathname,
        method: req.method,
        status_code: response.status,
        response_time_ms: responseTime,
        ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
        user_agent: req.headers.get('user-agent'),
        error_message: response.status >= 400 ? await response.clone().text() : null
      });

    // Update application analytics if we have an application
    if (application?.id) {
      const isSuccess = response.status >= 200 && response.status < 400;
      
      // Get rate limit tier to calculate cost
      const { data: tier } = await supabase
        .from('rate_limit_tiers')
        .select('cost_per_request')
        .eq('id', application.rate_limit_tier_id)
        .single();

      const cost = tier?.cost_per_request || 0;

      // Update analytics using our function
      await supabase.rpc('update_application_analytics', {
        p_application_id: application.id,
        p_success: isSuccess,
        p_response_time_ms: responseTime,
        p_cost: cost
      });

      // Trigger webhook for API usage event
      if (isSuccess) {
        await triggerWebhookEvent(application.id, 'api.request.success', {
          endpoint: url.pathname,
          method: req.method,
          response_time_ms: responseTime,
          user_id: user?.id
        }, supabase);
      }
    }
  } catch (error) {
    console.error('Failed to log request:', error);
  }
}

async function triggerWebhookEvent(applicationId: string, eventType: string, data: any, supabase: any) {
  try {
    await supabase.functions.invoke('webhook-manager', {
      body: {
        trigger: true,
        event_type: eventType,
        data: data,
        application_id: applicationId
      }
    });
  } catch (error) {
    console.error('Failed to trigger webhook:', error);
  }
}