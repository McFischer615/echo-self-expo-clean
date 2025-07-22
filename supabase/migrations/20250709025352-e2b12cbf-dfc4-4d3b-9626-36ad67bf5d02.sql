
-- Create AI providers configuration table
CREATE TABLE public.ai_providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  api_endpoint TEXT NOT NULL,
  secret_key_name TEXT NOT NULL,
  model_capabilities JSONB NOT NULL DEFAULT '{}',
  rate_limits JSONB NOT NULL DEFAULT '{}',
  cost_per_token NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  priority INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AI models configuration table
CREATE TABLE public.ai_models (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES public.ai_providers(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  context_window INTEGER NOT NULL DEFAULT 4096,
  max_tokens INTEGER NOT NULL DEFAULT 2048,
  supports_vision BOOLEAN NOT NULL DEFAULT false,
  supports_streaming BOOLEAN NOT NULL DEFAULT true,
  cost_per_input_token NUMERIC DEFAULT 0,
  cost_per_output_token NUMERIC DEFAULT 0,
  capabilities JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(provider_id, model_name)
);

-- Create AI usage analytics table
CREATE TABLE public.ai_usage_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  provider_id UUID NOT NULL REFERENCES public.ai_providers(id),
  model_id UUID NOT NULL REFERENCES public.ai_models(id),
  interaction_id UUID REFERENCES public.ai_host_interactions(id),
  tokens_used INTEGER NOT NULL DEFAULT 0,
  response_time_ms INTEGER,
  cost_usd NUMERIC DEFAULT 0,
  success BOOLEAN NOT NULL DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AI conversation contexts table
CREATE TABLE public.ai_conversation_contexts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  conversation_id TEXT NOT NULL,
  context_data JSONB NOT NULL DEFAULT '{}',
  message_count INTEGER NOT NULL DEFAULT 0,
  total_tokens INTEGER NOT NULL DEFAULT 0,
  last_interaction_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, conversation_id)
);

-- Enable RLS on all new tables
ALTER TABLE public.ai_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversation_contexts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for ai_providers (read-only for users)
CREATE POLICY "Anyone can view active AI providers"
ON public.ai_providers
FOR SELECT
USING (status = 'active');

-- Create RLS policies for ai_models (read-only for users)
CREATE POLICY "Anyone can view active AI models"
ON public.ai_models
FOR SELECT
USING (status = 'active');

-- Create RLS policies for ai_usage_analytics
CREATE POLICY "Users can view their own usage analytics"
ON public.ai_usage_analytics
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can insert usage analytics"
ON public.ai_usage_analytics
FOR INSERT
WITH CHECK (true);

-- Create RLS policies for ai_conversation_contexts
CREATE POLICY "Users can manage their own conversation contexts"
ON public.ai_conversation_contexts
FOR ALL
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_ai_usage_analytics_user_id ON public.ai_usage_analytics(user_id);
CREATE INDEX idx_ai_usage_analytics_created_at ON public.ai_usage_analytics(created_at);
CREATE INDEX idx_ai_conversation_contexts_user_id ON public.ai_conversation_contexts(user_id);
CREATE INDEX idx_ai_conversation_contexts_conversation_id ON public.ai_conversation_contexts(conversation_id);

-- Insert initial AI provider configurations
INSERT INTO public.ai_providers (name, display_name, api_endpoint, secret_key_name, model_capabilities, rate_limits, priority) VALUES
('openai', 'OpenAI', 'https://api.openai.com/v1', 'OPENAI_API_KEY', 
 '["text_generation", "vision", "code_generation"]', 
 '{"requests_per_minute": 500, "tokens_per_minute": 30000}', 1),
('gemini', 'Google Gemini', 'https://generativelanguage.googleapis.com/v1beta', 'GEMINI_API_KEY', 
 '["text_generation", "vision", "multimodal", "long_context"]', 
 '{"requests_per_minute": 60, "tokens_per_minute": 32000}', 2);

-- Insert initial AI model configurations
INSERT INTO public.ai_models (provider_id, model_name, display_name, context_window, max_tokens, supports_vision, capabilities) VALUES
((SELECT id FROM public.ai_providers WHERE name = 'openai'), 'gpt-4o-mini', 'GPT-4o Mini', 128000, 4096, true, '["text", "vision", "fast_response"]'),
((SELECT id FROM public.ai_providers WHERE name = 'openai'), 'gpt-4o', 'GPT-4o', 128000, 4096, true, '["text", "vision", "advanced_reasoning"]'),
((SELECT id FROM public.ai_providers WHERE name = 'gemini'), 'gemini-1.5-flash', 'Gemini 1.5 Flash', 1048576, 8192, true, '["text", "vision", "multimodal", "long_context"]'),
((SELECT id FROM public.ai_providers WHERE name = 'gemini'), 'gemini-1.5-pro', 'Gemini 1.5 Pro', 2097152, 8192, true, '["text", "vision", "multimodal", "long_context", "advanced_reasoning"]');

-- Add trigger to update updated_at timestamps
CREATE TRIGGER update_ai_providers_updated_at
BEFORE UPDATE ON public.ai_providers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_models_updated_at
BEFORE UPDATE ON public.ai_models
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_conversation_contexts_updated_at
BEFORE UPDATE ON public.ai_conversation_contexts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Extend ai_host_interactions table with provider and model info
ALTER TABLE public.ai_host_interactions 
ADD COLUMN provider_id UUID REFERENCES public.ai_providers(id),
ADD COLUMN model_id UUID REFERENCES public.ai_models(id),
ADD COLUMN tokens_used INTEGER DEFAULT 0,
ADD COLUMN response_time_ms INTEGER,
ADD COLUMN conversation_id TEXT;

-- Create function to log AI usage
CREATE OR REPLACE FUNCTION public.log_ai_usage(
  p_user_id UUID,
  p_provider_name TEXT,
  p_model_name TEXT,
  p_interaction_id UUID,
  p_tokens_used INTEGER,
  p_response_time_ms INTEGER,
  p_success BOOLEAN DEFAULT true,
  p_error_message TEXT DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_provider_id UUID;
  v_model_id UUID;
  v_usage_id UUID;
BEGIN
  -- Get provider and model IDs
  SELECT id INTO v_provider_id FROM public.ai_providers WHERE name = p_provider_name;
  SELECT id INTO v_model_id FROM public.ai_models WHERE model_name = p_model_name AND provider_id = v_provider_id;
  
  -- Insert usage analytics
  INSERT INTO public.ai_usage_analytics (
    user_id, provider_id, model_id, interaction_id, 
    tokens_used, response_time_ms, success, error_message
  ) VALUES (
    p_user_id, v_provider_id, v_model_id, p_interaction_id,
    p_tokens_used, p_response_time_ms, p_success, p_error_message
  ) RETURNING id INTO v_usage_id;
  
  RETURN v_usage_id;
END;
$$;
