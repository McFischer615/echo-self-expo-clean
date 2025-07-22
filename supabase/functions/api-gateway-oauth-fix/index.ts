
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method === 'POST') {
      const { action } = await req.json();
      
      if (action === 'fix_oauth_tables') {
        // Check if oauth_authorization_codes table exists
        const { data: tables, error: tablesError } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public')
          .eq('table_name', 'oauth_authorization_codes');

        if (tablesError) {
          console.error('Error checking tables:', tablesError);
          return new Response(
            JSON.stringify({ error: 'Failed to check table existence' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (!tables || tables.length === 0) {
          return new Response(
            JSON.stringify({ 
              error: 'OAuth authorization codes table missing',
              message: 'Please run the SQL migration to create the missing table'
            }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ 
            success: true,
            message: 'OAuth tables are properly configured'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Default response for GET requests - health check
    return new Response(
      JSON.stringify({ 
        status: 'API Gateway OAuth Fix endpoint is running',
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in api-gateway-oauth-fix function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
