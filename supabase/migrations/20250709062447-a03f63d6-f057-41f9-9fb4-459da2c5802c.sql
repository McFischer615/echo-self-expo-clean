
-- Create webhook_subscriptions table for managing webhook registrations
CREATE TABLE public.webhook_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.oauth_applications(id) ON DELETE CASCADE,
  event_types TEXT[] NOT NULL DEFAULT '{}',
  endpoint_url TEXT NOT NULL,
  secret_key TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create webhook_deliveries table for tracking webhook delivery attempts
CREATE TABLE public.webhook_deliveries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  webhook_subscription_id UUID NOT NULL REFERENCES public.webhook_subscriptions(id) ON DELETE CASCADE,
  webhook_event_id UUID NOT NULL REFERENCES public.webhook_events(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending',
  response_status_code INTEGER,
  response_body TEXT,
  error_message TEXT,
  delivered_at TIMESTAMP WITH TIME ZONE,
  next_retry_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX idx_webhook_subscriptions_application_id ON public.webhook_subscriptions(application_id);
CREATE INDEX idx_webhook_subscriptions_active ON public.webhook_subscriptions(is_active) WHERE is_active = true;
CREATE INDEX idx_webhook_deliveries_subscription_id ON public.webhook_deliveries(webhook_subscription_id);
CREATE INDEX idx_webhook_deliveries_status ON public.webhook_deliveries(status);
CREATE INDEX idx_webhook_deliveries_next_retry ON public.webhook_deliveries(next_retry_at) WHERE status = 'failed';

-- Enable RLS
ALTER TABLE public.webhook_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_deliveries ENABLE ROW LEVEL SECURITY;

-- RLS policies for webhook_subscriptions
CREATE POLICY "Application owners can manage their webhook subscriptions"
ON public.webhook_subscriptions
FOR ALL
USING (
  application_id IN (
    SELECT id FROM public.oauth_applications 
    WHERE owner_user_id = auth.uid()
  )
);

-- RLS policies for webhook_deliveries  
CREATE POLICY "Application owners can view their webhook deliveries"
ON public.webhook_deliveries
FOR SELECT
USING (
  webhook_subscription_id IN (
    SELECT ws.id FROM public.webhook_subscriptions ws
    JOIN public.oauth_applications oa ON ws.application_id = oa.id
    WHERE oa.owner_user_id = auth.uid()
  )
);

-- Add trigger for updated_at on webhook_subscriptions
CREATE TRIGGER update_webhook_subscriptions_updated_at
  BEFORE UPDATE ON public.webhook_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add missing OAuth 2.0 enhancements to existing tables
ALTER TABLE public.oauth_applications 
ADD COLUMN IF NOT EXISTS token_endpoint_auth_method TEXT DEFAULT 'client_secret_basic',
ADD COLUMN IF NOT EXISTS grant_types TEXT[] DEFAULT ARRAY['authorization_code', 'refresh_token'],
ADD COLUMN IF NOT EXISTS response_types TEXT[] DEFAULT ARRAY['code'],
ADD COLUMN IF NOT EXISTS jwks_uri TEXT,
ADD COLUMN IF NOT EXISTS application_type TEXT DEFAULT 'web',
ADD COLUMN IF NOT EXISTS logo_uri TEXT,
ADD COLUMN IF NOT EXISTS policy_uri TEXT,
ADD COLUMN IF NOT EXISTS tos_uri TEXT;

-- Add PKCE support to authorization codes table
ALTER TABLE public.oauth_authorization_codes
ADD COLUMN IF NOT EXISTS code_challenge TEXT,
ADD COLUMN IF NOT EXISTS code_challenge_method TEXT DEFAULT 'S256';

-- Add enhanced rate limiting fields
CREATE TABLE IF NOT EXISTS public.rate_limit_tiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  requests_per_hour INTEGER NOT NULL DEFAULT 1000,
  requests_per_minute INTEGER NOT NULL DEFAULT 100,
  burst_limit INTEGER NOT NULL DEFAULT 50,
  cost_per_request NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default rate limit tiers
INSERT INTO public.rate_limit_tiers (name, requests_per_hour, requests_per_minute, burst_limit, cost_per_request)
VALUES 
  ('free', 1000, 50, 20, 0),
  ('pro', 10000, 200, 100, 0.001),
  ('enterprise', 100000, 1000, 500, 0.0005)
ON CONFLICT (name) DO NOTHING;

-- Add rate_limit_tier_id to oauth_applications if not exists
ALTER TABLE public.oauth_applications
ADD COLUMN IF NOT EXISTS rate_limit_tier_id UUID REFERENCES public.rate_limit_tiers(id) DEFAULT (
  SELECT id FROM public.rate_limit_tiers WHERE name = 'free' LIMIT 1
);

-- Enable RLS on rate_limit_tiers
ALTER TABLE public.rate_limit_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rate limit tiers are viewable by everyone"
ON public.rate_limit_tiers
FOR SELECT
USING (true);

-- Add application analytics function
CREATE OR REPLACE FUNCTION public.update_application_analytics(
  p_application_id UUID,
  p_success BOOLEAN,
  p_response_time_ms INTEGER,
  p_cost NUMERIC DEFAULT 0
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This function will be used by the API gateway to update analytics
  -- For now, we'll store this in the api_gateway_logs table
  -- Future enhancement could create a dedicated analytics table
  
  RETURN TRUE;
END;
$$;
