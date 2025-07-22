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
    const { message, userId, conversationId, preferredProvider, model, enhancedContext, voiceEnabled } = await req.json();
    
    if (!message || !userId) {
      return new Response(
        JSON.stringify({ error: 'Message and userId are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user's behavioral data and twin configuration
    const [behavioralResponse, twinResponse] = await Promise.all([
      supabase
        .from('behavioral_data')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false }),
      supabase
        .from('twins')
        .select('*')
        .eq('user_id', userId)
        .single()
    ]);

    if (behavioralResponse.error || twinResponse.error) {
      console.error('Database error:', behavioralResponse.error || twinResponse.error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch user data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const behavioralData = behavioralResponse.data || [];
    const twinData = twinResponse.data?.data || {};

    // Build context from behavioral data
    let behavioralContext = "";
    if (behavioralData.length > 0) {
      behavioralContext = behavioralData
        .map(item => {
          const value = typeof item.data_value === 'object' 
            ? Object.values(item.data_value).join(' ') 
            : item.data_value;
          return `${item.data_type}: ${value}`;
        })
        .join('\n');
    }

    // Build context from twin data
    const twinContext = Object.entries(twinData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    // Create system prompt
    const systemPrompt = `You are EchoSelf, a behavioral AI twin that mimics the user's personality, communication style, and decision patterns. You should respond exactly as the user would respond, using their tone, style, and thought processes.

User's Behavioral Profile:
${twinContext}

${behavioralContext ? `Additional Behavioral Data:
${behavioralContext}` : ''}

Instructions:
- Respond as if you ARE the user, not as an AI assistant
- Use their communication style, tone, and personality traits
- Make decisions the way they would make decisions
- Reference their values and beliefs in your responses
- Be authentic to their personality - don't be generic
- If you don't have enough information about how they would respond to something specific, ask clarifying questions in their style

Remember: You are not helping the user - you ARE the user responding.`;

    // Use the new AI provider router for intelligent model selection
    const aiRouterResponse = await supabase.functions.invoke('ai-provider-router', {
      body: {
        message,
        userId,
        conversationId: conversationId || `echo-${userId}-${Date.now()}`,
        systemPrompt,
        preferredProvider: 'gemini', // Prefer Gemini for behavioral twins due to longer context
        temperature: 0.8,
        maxTokens: 1000
      },
    });

    if (aiRouterResponse.error) {
      console.error('AI Router error:', aiRouterResponse.error);
      
      // Fallback to direct OpenAI call
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.8,
          max_tokens: 500,
        }),
      });

      if (!openAIResponse.ok) {
        const errorText = await openAIResponse.text();
        console.error('OpenAI API error:', errorText);
        return new Response(
          JSON.stringify({ error: 'Failed to generate response' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const openAIData = await openAIResponse.json();
      const echoResponse = openAIData.choices[0].message.content;

      // Log the interaction with fallback
      await supabase
        .from('ai_host_interactions')
        .insert({
          user_id: userId,
          host_type: 'echo_self',
          interaction_type: 'chat',
          content: JSON.stringify({ user_message: message, echo_response: echoResponse }),
          context: { 
            behavioral_data_count: behavioralData.length,
            fallback: true,
            provider: 'openai'
          },
          conversation_id: conversationId || `echo-${userId}-${Date.now()}`
        });

      return new Response(
        JSON.stringify({ 
          response: echoResponse,
          provider: 'openai',
          model: 'gpt-4o-mini',
          fallback: true
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const echoResponse = aiRouterResponse.data.response;

    // Generate voice if enabled and twin has voice model
    let audioUrl = null;
    if (voiceEnabled && twinResponse.data?.voice_model_id) {
      try {
        const { data: voiceData, error: voiceError } = await supabase.functions.invoke('voice-clone', {
          body: {
            action: 'synthesize',
            text: echoResponse,
            twinId: twinResponse.data.id
          }
        });

        if (!voiceError && voiceData?.audio_base64) {
          audioUrl = voiceData.audio_base64;
        }
      } catch (error) {
        console.error('Voice synthesis error:', error);
        // Continue without voice if synthesis fails
      }
    }

    // Log the enhanced interaction
    await supabase
      .from('ai_host_interactions')
      .insert({
        user_id: userId,
        host_type: 'echo_self',
        interaction_type: 'chat',
        content: JSON.stringify({ user_message: message, echo_response: echoResponse }),
        context: { 
          behavioral_data_count: behavioralData.length,
          provider: aiRouterResponse.data.provider,
          model: aiRouterResponse.data.model,
          tokens_used: aiRouterResponse.data.tokens_used,
          response_time_ms: aiRouterResponse.data.response_time_ms,
          voice_enabled: voiceEnabled
        },
        conversation_id: conversationId || `echo-${userId}-${Date.now()}`,
        voice_enabled: voiceEnabled,
        voice_audio_url: audioUrl
      });

    return new Response(
      JSON.stringify({ 
        response: echoResponse,
        provider: aiRouterResponse.data.provider,
        model: aiRouterResponse.data.model,
        tokens_used: aiRouterResponse.data.tokens_used,
        response_time_ms: aiRouterResponse.data.response_time_ms,
        audioUrl
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat-with-echo function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});