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
    const { userId, behavioralData } = await req.json();
    
    if (!userId || !behavioralData) {
      return new Response(
        JSON.stringify({ error: 'Missing userId or behavioralData' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Validate user exists
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      return new Response(
        JSON.stringify({ error: 'Invalid user ID' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Store behavioral data
    const { error: insertError } = await supabase
      .from('behavioral_data')
      .insert({
        user_id: userId,
        data_type: behavioralData.type,
        data_value: behavioralData.data_value,
        timestamp: new Date().toISOString()
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to store behavioral data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update daily stats if available
    try {
      await updateDailyStats(supabase, userId, behavioralData);
    } catch (error) {
      console.warn('Failed to update daily stats:', error);
      // Don't fail the request if stats update fails
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Behavioral data stored successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in collect-behavioral-data function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function updateDailyStats(supabase: any, userId: string, behavioralData: any) {
  const today = new Date().toISOString().split('T')[0];
  
  // Get or create today's stats
  const { data: existingStats, error: fetchError } = await supabase
    .from('daily_behavioral_stats')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .single();

  let interactions = 1;
  let words = 0;

  // Extract word count if available
  if (behavioralData.data_value && behavioralData.data_value.word_count) {
    words = behavioralData.data_value.word_count;
  }

  if (existingStats) {
    // Update existing stats
    await supabase
      .from('daily_behavioral_stats')
      .update({
        interactions: existingStats.interactions + interactions,
        words: existingStats.words + words,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingStats.id);
  } else {
    // Create new stats entry
    await supabase
      .from('daily_behavioral_stats')
      .insert({
        user_id: userId,
        date: today,
        interactions: interactions,
        words: words
      });
  }
}