-- Create OAuth applications table for third-party integrations
CREATE TABLE public.oauth_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  client_id TEXT NOT NULL UNIQUE,
  client_secret TEXT NOT NULL,
  redirect_uris TEXT[] NOT NULL DEFAULT '{}',
  scopes TEXT[] NOT NULL DEFAULT '{}',
  platform_type TEXT NOT NULL, -- 'email', 'chat', 'social', 'api'
  owner_user_id UUID NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  rate_limit_per_hour INTEGER NOT NULL DEFAULT 1000,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create OAuth tokens table
CREATE TABLE public.oauth_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.oauth_applications(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  access_token TEXT NOT NULL UNIQUE,
  refresh_token TEXT,
  token_type TEXT NOT NULL DEFAULT 'Bearer',
  scopes TEXT[] NOT NULL DEFAULT '{}',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  revoked_at TIMESTAMP WITH TIME ZONE
);

-- Create API usage logs for rate limiting and analytics
CREATE TABLE public.api_gateway_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES public.oauth_applications(id) ON DELETE SET NULL,
  user_id UUID,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  response_time_ms INTEGER,
  request_size_bytes INTEGER,
  response_size_bytes INTEGER,
  ip_address INET,
  user_agent TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create external platform integrations table
CREATE TABLE public.platform_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  platform_type TEXT NOT NULL, -- 'gmail', 'slack', 'discord', 'telegram', etc.
  platform_user_id TEXT NOT NULL,
  platform_username TEXT,
  integration_data JSONB NOT NULL DEFAULT '{}',
  access_credentials JSONB, -- encrypted platform-specific tokens
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, platform_type, platform_user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.oauth_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oauth_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_gateway_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_integrations ENABLE ROW LEVEL SECURITY;

-- OAuth Applications policies
CREATE POLICY "Users can view their own OAuth applications"
ON public.oauth_applications
FOR SELECT
USING (auth.uid() = owner_user_id);

CREATE POLICY "Users can create OAuth applications"
ON public.oauth_applications
FOR INSERT
WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Users can update their own OAuth applications"
ON public.oauth_applications
FOR UPDATE
USING (auth.uid() = owner_user_id);

-- OAuth Tokens policies
CREATE POLICY "System can manage OAuth tokens"
ON public.oauth_tokens
FOR ALL
USING (true);

-- API Gateway Logs policies
CREATE POLICY "Application owners can view their logs"
ON public.api_gateway_logs
FOR SELECT
USING (
  application_id IN (
    SELECT id FROM public.oauth_applications 
    WHERE owner_user_id = auth.uid()
  )
);

CREATE POLICY "System can insert API logs"
ON public.oauth_tokens
FOR INSERT
WITH CHECK (true);

-- Platform Integrations policies
CREATE POLICY "Users can manage their own platform integrations"
ON public.platform_integrations
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_oauth_tokens_access_token ON public.oauth_tokens(access_token);
CREATE INDEX idx_oauth_tokens_user_id ON public.oauth_tokens(user_id);
CREATE INDEX idx_oauth_tokens_expires_at ON public.oauth_tokens(expires_at);
CREATE INDEX idx_api_gateway_logs_created_at ON public.api_gateway_logs(created_at);
CREATE INDEX idx_api_gateway_logs_application_id ON public.api_gateway_logs(application_id);
CREATE INDEX idx_platform_integrations_user_platform ON public.platform_integrations(user_id, platform_type);

-- Create triggers for updated_at
CREATE TRIGGER update_oauth_applications_updated_at
  BEFORE UPDATE ON public.oauth_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_platform_integrations_updated_at
  BEFORE UPDATE ON public.platform_integrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();