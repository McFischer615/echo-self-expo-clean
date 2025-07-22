import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AIRequest {
  message: string;
  userId: string;
  conversationId?: string;
  preferredProvider?: string;
  model?: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}

interface AIProvider {
  id: string;
  name: string;
  api_endpoint: string;
  secret_key_name: string;
  priority: number;
  status: string;
}

interface AIModel {
  id: string;
  provider_id: string;
  model_name: string;
  display_name: string;
  context_window: number;
  max_tokens: number;
  supports_vision: boolean;
  capabilities: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const aiRequest: AIRequest = await req.json();
    const { message, userId, conversationId, preferredProvider, model, systemPrompt, maxTokens = 2048, temperature = 0.7 } = aiRequest;

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

    // Get available providers and models
    const [providersResponse, modelsResponse] = await Promise.all([
      supabase
        .from('ai_providers')
        .select('*')
        .eq('status', 'active')
        .order('priority'),
      supabase
        .from('ai_models')
        .select('*')
        .eq('status', 'active')
    ]);

    if (providersResponse.error || modelsResponse.error) {
      console.error('Database error:', providersResponse.error || modelsResponse.error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch AI configuration' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const providers: AIProvider[] = providersResponse.data || [];
    const models: AIModel[] = modelsResponse.data || [];

    // Select provider and model based on preferences or intelligent routing
    const selectedProvider = selectProvider(providers, preferredProvider);
    const selectedModel = selectModel(models, selectedProvider, model, message);

    if (!selectedProvider || !selectedModel) {
      return new Response(
        JSON.stringify({ error: 'No suitable AI provider available' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Using provider: ${selectedProvider.name}, model: ${selectedModel.model_name}`);

    // Get enhanced conversation context if provided
    let conversationContext = [];
    let enhancedContext = null;
    if (conversationId) {
      const contextResponse = await supabase
        .from('ai_conversation_contexts')
        .select('*')
        .eq('user_id', userId)
        .eq('conversation_id', conversationId)
        .single();

      if (contextResponse.data?.context_data?.messages) {
        conversationContext = contextResponse.data.context_data.messages;
      }

      // Get enhanced contextual information
      enhancedContext = contextResponse.data;

      // Get similar context using vector search
      if (enhancedContext) {
        try {
          const embeddingResponse = await supabase.functions.invoke('generate-embeddings', {
            body: { text: message }
          });

          if (!embeddingResponse.error && embeddingResponse.data?.embedding) {
            const similarContextResponse = await supabase.rpc('get_similar_context', {
              p_user_id: userId,
              p_query_embedding: `[${embeddingResponse.data.embedding.join(',')}]`,
              p_limit: 3,
              p_similarity_threshold: 0.7
            });

            if (!similarContextResponse.error && similarContextResponse.data) {
              // Add similar context to conversation history
              similarContextResponse.data.forEach(ctx => {
                conversationContext.unshift({
                  role: 'system',
                  content: `Relevant past context: ${ctx.content_text} (similarity: ${(ctx.similarity * 100).toFixed(1)}%)`
                });
              });
            }
          }
        } catch (error) {
          console.error('Error retrieving similar context:', error);
        }
      }
    }

    // Build messages array
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    
    // Add conversation context
    conversationContext.forEach(msg => messages.push(msg));
    
    // Add current message
    messages.push({ role: 'user', content: message });

    const startTime = Date.now();
    let response, tokensUsed = 0;

    // Route to appropriate provider
    if (selectedProvider.name === 'openai') {
      response = await callOpenAI(selectedModel.model_name, messages, maxTokens, temperature);
      tokensUsed = estimateTokens(message + (response || ''));
    } else if (selectedProvider.name === 'gemini') {
      response = await callGemini(selectedModel.model_name, messages, maxTokens, temperature);
      tokensUsed = estimateTokens(message + (response || ''));
    } else {
      throw new Error(`Unsupported provider: ${selectedProvider.name}`);
    }

    const responseTime = Date.now() - startTime;

    // Log interaction
    const { data: interactionData } = await supabase
      .from('ai_host_interactions')
      .insert({
        user_id: userId,
        host_type: 'ai_provider_router',
        interaction_type: 'chat',
        content: JSON.stringify({ user_message: message, ai_response: response }),
        context: { 
          provider: selectedProvider.name, 
          model: selectedModel.model_name,
          conversation_id: conversationId 
        },
        provider_id: selectedProvider.id,
        model_id: selectedModel.id,
        tokens_used: tokensUsed,
        response_time_ms: responseTime,
        conversation_id: conversationId
      })
      .select()
      .single();

    // Log usage analytics
    if (interactionData) {
      await supabase.rpc('log_ai_usage', {
        p_user_id: userId,
        p_provider_name: selectedProvider.name,
        p_model_name: selectedModel.model_name,
        p_interaction_id: interactionData.id,
        p_tokens_used: tokensUsed,
        p_response_time_ms: responseTime,
        p_success: true
      });
    }

    // Update conversation context with enhanced memory
    if (conversationId && response) {
      const updatedContext = [
        ...conversationContext.slice(-10), // Keep last 10 messages for context
        { role: 'user', content: message },
        { role: 'assistant', content: response }
      ];

      // Store response embedding for future similarity search
      try {
        const responseEmbeddingResponse = await supabase.functions.invoke('generate-embeddings', {
          body: { text: response }
        });

        if (!responseEmbeddingResponse.error && responseEmbeddingResponse.data?.embedding) {
          await supabase.rpc('store_context_embedding', {
            p_user_id: userId,
            p_conversation_id: conversationId,
            p_content_text: response,
            p_embedding: `[${responseEmbeddingResponse.data.embedding.join(',')}]`,
            p_content_type: 'ai_response',
            p_importance_score: 0.6
          });
        }
      } catch (error) {
        console.error('Error storing response embedding:', error);
      }

      // Update context with enhanced fields
      const contextUpdate = {
        user_id: userId,
        conversation_id: conversationId,
        context_data: { messages: updatedContext },
        message_count: updatedContext.length,
        total_tokens: tokensUsed,
        last_interaction_at: new Date().toISOString()
      };

      // Preserve existing enhanced context data
      if (enhancedContext) {
        contextUpdate.relationship_context = enhancedContext.relationship_context || {};
        contextUpdate.personal_history = enhancedContext.personal_history || {};
        contextUpdate.emotional_state = enhancedContext.emotional_state || {};
        contextUpdate.topic_threads = enhancedContext.topic_threads || [];
        contextUpdate.context_importance_scores = enhancedContext.context_importance_scores || {};
      }

      await supabase
        .from('ai_conversation_contexts')
        .upsert(contextUpdate);
    }

    return new Response(
      JSON.stringify({ 
        response,
        provider: selectedProvider.name,
        model: selectedModel.model_name,
        tokens_used: tokensUsed,
        response_time_ms: responseTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in AI provider router:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function selectProvider(providers: AIProvider[], preferredProvider?: string): AIProvider | null {
  if (preferredProvider) {
    const provider = providers.find(p => p.name === preferredProvider);
    if (provider) return provider;
  }
  
  // Default to highest priority available provider
  return providers[0] || null;
}

function selectModel(models: AIModel[], provider: AIProvider, preferredModel?: string, message?: string): AIModel | null {
  const providerModels = models.filter(m => m.provider_id === provider.id);
  
  if (preferredModel) {
    const model = providerModels.find(m => m.model_name === preferredModel);
    if (model) return model;
  }

  // Intelligent model selection based on message characteristics
  const messageLength = message?.length || 0;
  const isComplex = message?.includes('analyze') || message?.includes('explain') || message?.includes('code');

  if (isComplex || messageLength > 1000) {
    // Use more powerful models for complex tasks
    const advancedModels = providerModels.filter(m => 
      m.capabilities.includes('advanced_reasoning') || 
      m.model_name.includes('pro') || 
      m.model_name.includes('4o')
    );
    if (advancedModels.length > 0) return advancedModels[0];
  }

  // Default to first available model for the provider
  return providerModels[0] || null;
}

async function callOpenAI(model: string, messages: any[], maxTokens: number, temperature: number): Promise<string> {
  const openAIKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIKey) {
    throw new Error('OpenAI API key not found');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', errorText);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(model: string, messages: any[], maxTokens: number, temperature: number): Promise<string> {
  const geminiKey = Deno.env.get('GEMINI_API_KEY');
  if (!geminiKey) {
    throw new Error('Gemini API key not found');
  }

  // Convert OpenAI format to Gemini format
  const geminiMessages = messages
    .filter(msg => msg.role !== 'system')
    .map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

  const systemInstruction = messages.find(msg => msg.role === 'system')?.content;

  const requestBody: any = {
    contents: geminiMessages,
    generationConfig: {
      maxOutputTokens: maxTokens,
      temperature,
    },
  };

  if (systemInstruction) {
    requestBody.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

function estimateTokens(text: string): number {
  // Rough estimation: ~4 characters per token for English text
  return Math.ceil(text.length / 4);
}