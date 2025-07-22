
-- Create missing core tables for Echo AI and API Gateway functionality

-- 1. Twins table for Echo AI personalities
CREATE TABLE public.twins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS on twins table
ALTER TABLE public.twins ENABLE ROW LEVEL SECURITY;

-- RLS policies for twins
CREATE POLICY "Users can manage their own twins" 
ON public.twins 
FOR ALL 
USING (auth.uid() = user_id);

-- 2. OAuth Applications table for API Gateway
CREATE TABLE public.oauth_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  client_id TEXT NOT NULL UNIQUE DEFAULT gen_random_uuid()::text,
  client_secret TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  redirect_uris TEXT[] NOT NULL DEFAULT '{}',
  scopes TEXT[] NOT NULL DEFAULT '{}',
  owner_user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS on oauth_applications
ALTER TABLE public.oauth_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for oauth_applications  
CREATE POLICY "Users can manage their own applications"
ON public.oauth_applications
FOR ALL
USING (auth.uid() = owner_user_id);

-- 3. OAuth Authorization Codes table (extend existing if needed)
CREATE TABLE IF NOT EXISTS public.oauth_authorization_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  application_id UUID NOT NULL,
  user_id UUID NOT NULL, 
  redirect_uri TEXT NOT NULL,
  scopes TEXT[] NOT NULL DEFAULT '{}',
  code_challenge TEXT,
  code_challenge_method TEXT DEFAULT 'plain',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '10 minutes'),
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on oauth_authorization_codes
ALTER TABLE public.oauth_authorization_codes ENABLE ROW LEVEL SECURITY;

-- RLS policies for oauth_authorization_codes
CREATE POLICY "Users can manage their own auth codes"
ON public.oauth_authorization_codes  
FOR ALL
USING (auth.uid() = user_id);

-- 4. OAuth Tokens table
CREATE TABLE public.oauth_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  access_token TEXT NOT NULL UNIQUE,
  refresh_token TEXT UNIQUE,
  token_type TEXT NOT NULL DEFAULT 'Bearer',
  application_id UUID NOT NULL,
  user_id UUID NOT NULL,
  scopes TEXT[] NOT NULL DEFAULT '{}',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  refresh_expires_at TIMESTAMP WITH TIME ZONE,
  revoked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on oauth_tokens
ALTER TABLE public.oauth_tokens ENABLE ROW LEVEL SECURITY;

-- RLS policies for oauth_tokens
CREATE POLICY "Users can view their own tokens"
ON public.oauth_tokens
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Applications can manage tokens for their users"
ON public.oauth_tokens
FOR ALL
USING (application_id IN (
  SELECT id FROM public.oauth_applications WHERE owner_user_id = auth.uid()
));

-- 5. Webhook Subscriptions table
CREATE TABLE public.webhook_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL,
  endpoint_url TEXT NOT NULL,
  event_types TEXT[] NOT NULL DEFAULT '{}',
  secret_key TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on webhook_subscriptions
ALTER TABLE public.webhook_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies for webhook_subscriptions
CREATE POLICY "Application owners can manage webhooks"
ON public.webhook_subscriptions
FOR ALL
USING (application_id IN (
  SELECT id FROM public.oauth_applications WHERE owner_user_id = auth.uid()
));

-- 6. Webhook Deliveries table  
CREATE TABLE public.webhook_deliveries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  response_status INTEGER,
  response_body TEXT,
  attempt_count INTEGER NOT NULL DEFAULT 1,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on webhook_deliveries
ALTER TABLE public.webhook_deliveries ENABLE ROW LEVEL SECURITY;

-- RLS policies for webhook_deliveries
CREATE POLICY "Application owners can view webhook deliveries"
ON public.webhook_deliveries
FOR SELECT
USING (subscription_id IN (
  SELECT ws.id FROM public.webhook_subscriptions ws
  JOIN public.oauth_applications oa ON ws.application_id = oa.id
  WHERE oa.owner_user_id = auth.uid()
));

-- 7. Rate Limit Buckets table for API Gateway
CREATE TABLE public.rate_limit_buckets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL, -- user_id, api_key, or IP
  endpoint TEXT NOT NULL,
  requests_count INTEGER NOT NULL DEFAULT 0,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(identifier, endpoint, window_start)
);

-- Enable RLS on rate_limit_buckets (system managed)
ALTER TABLE public.rate_limit_buckets ENABLE ROW LEVEL SECURITY;

-- RLS policy for rate_limit_buckets (system access only)
CREATE POLICY "System can manage rate limit buckets"
ON public.rate_limit_buckets
FOR ALL
USING (auth.role() = 'service_role');

-- Add foreign key constraints
ALTER TABLE public.oauth_authorization_codes 
ADD CONSTRAINT fk_oauth_authorization_codes_application 
FOREIGN KEY (application_id) REFERENCES public.oauth_applications(id) ON DELETE CASCADE;

ALTER TABLE public.oauth_tokens 
ADD CONSTRAINT fk_oauth_tokens_application 
FOREIGN KEY (application_id) REFERENCES public.oauth_applications(id) ON DELETE CASCADE;

ALTER TABLE public.webhook_subscriptions 
ADD CONSTRAINT fk_webhook_subscriptions_application 
FOREIGN KEY (application_id) REFERENCES public.oauth_applications(id) ON DELETE CASCADE;

ALTER TABLE public.webhook_deliveries 
ADD CONSTRAINT fk_webhook_deliveries_subscription 
FOREIGN KEY (subscription_id) REFERENCES public.webhook_subscriptions(id) ON DELETE CASCADE;

-- Add update timestamp triggers
CREATE TRIGGER update_twins_updated_at
  BEFORE UPDATE ON public.twins
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_oauth_applications_updated_at
  BEFORE UPDATE ON public.oauth_applications  
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_oauth_tokens_updated_at
  BEFORE UPDATE ON public.oauth_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_webhook_subscriptions_updated_at
  BEFORE UPDATE ON public.webhook_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rate_limit_buckets_updated_at
  BEFORE UPDATE ON public.rate_limit_buckets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for performance
CREATE INDEX idx_twins_user_id ON public.twins(user_id);
CREATE INDEX idx_twins_active ON public.twins(is_active) WHERE is_active = true;

CREATE INDEX idx_oauth_applications_owner ON public.oauth_applications(owner_user_id);
CREATE INDEX idx_oauth_applications_client_id ON public.oauth_applications(client_id);

CREATE INDEX idx_oauth_codes_code ON public.oauth_authorization_codes(code);
CREATE INDEX idx_oauth_codes_expires ON public.oauth_authorization_codes(expires_at);

CREATE INDEX idx_oauth_tokens_access ON public.oauth_tokens(access_token);
CREATE INDEX idx_oauth_tokens_refresh ON public.oauth_tokens(refresh_token);
CREATE INDEX idx_oauth_tokens_expires ON public.oauth_tokens(expires_at);

CREATE INDEX idx_webhook_subscriptions_app ON public.webhook_subscriptions(application_id);
CREATE INDEX idx_webhook_subscriptions_active ON public.webhook_subscriptions(is_active) WHERE is_active = true;

CREATE INDEX idx_webhook_deliveries_subscription ON public.webhook_deliveries(subscription_id);
CREATE INDEX idx_webhook_deliveries_created ON public.webhook_deliveries(created_at);

CREATE INDEX idx_rate_limit_identifier ON public.rate_limit_buckets(identifier, endpoint);
CREATE INDEX idx_rate_limit_window ON public.rate_limit_buckets(window_start);
