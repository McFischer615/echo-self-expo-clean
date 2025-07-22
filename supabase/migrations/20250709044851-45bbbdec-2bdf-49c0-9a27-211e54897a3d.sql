
-- Create missing OAuth authorization codes table
CREATE TABLE public.oauth_authorization_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  application_id UUID NOT NULL REFERENCES public.oauth_applications(id) ON DELETE CASCADE,
  user_id UUID,
  redirect_uri TEXT NOT NULL,
  scope TEXT[] NOT NULL DEFAULT '{}',
  state TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.oauth_authorization_codes ENABLE ROW LEVEL SECURITY;

-- Create policy for system management
CREATE POLICY "System can manage authorization codes"
ON public.oauth_authorization_codes
FOR ALL
USING (true);

-- Create performance indexes
CREATE INDEX idx_oauth_authorization_codes_code ON public.oauth_authorization_codes(code);
CREATE INDEX idx_oauth_authorization_codes_expires_at ON public.oauth_authorization_codes(expires_at);

-- Add webhook subscriptions table for Phase 4B
CREATE TABLE public.webhook_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.oauth_applications(id) ON DELETE CASCADE,
  endpoint_url TEXT NOT NULL,
  event_types TEXT[] NOT NULL DEFAULT '{}',
  secret_key TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for webhooks
ALTER TABLE public.webhook_subscriptions ENABLE ROW LEVEL SECURITY;

-- Webhook subscription policies
CREATE POLICY "Application owners can manage their webhooks"
ON public.webhook_subscriptions
FOR ALL
USING (application_id IN (
  SELECT id FROM oauth_applications WHERE owner_user_id = auth.uid()
));

-- Add webhook delivery logs
CREATE TABLE public.webhook_deliveries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id UUID NOT NULL REFERENCES public.webhook_subscriptions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  response_status INTEGER,
  response_body TEXT,
  attempt_count INTEGER NOT NULL DEFAULT 1,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for webhook deliveries
ALTER TABLE public.webhook_deliveries ENABLE ROW LEVEL SECURITY;

-- Webhook delivery policies
CREATE POLICY "Application owners can view their webhook deliveries"
ON public.webhook_deliveries
FOR SELECT
USING (subscription_id IN (
  SELECT ws.id FROM webhook_subscriptions ws
  JOIN oauth_applications oa ON ws.application_id = oa.id
  WHERE oa.owner_user_id = auth.uid()
));

-- Add enhanced rate limiting table
CREATE TABLE public.rate_limit_tiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  requests_per_hour INTEGER NOT NULL,
  burst_limit INTEGER NOT NULL,
  cost_per_request DECIMAL(10,4) DEFAULT 0,
  features JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default rate limit tiers
INSERT INTO public.rate_limit_tiers (name, requests_per_hour, burst_limit, cost_per_request, features) VALUES
('free', 1000, 100, 0, '{"webhook_support": false, "analytics": "basic"}'),
('pro', 10000, 500, 0.001, '{"webhook_support": true, "analytics": "advanced"}'),
('enterprise', 100000, 2000, 0.0005, '{"webhook_support": true, "analytics": "premium", "priority_support": true}');

-- Add tier to applications
ALTER TABLE public.oauth_applications ADD COLUMN rate_limit_tier_id UUID REFERENCES public.rate_limit_tiers(id) DEFAULT (SELECT id FROM rate_limit_tiers WHERE name = 'free');

-- Update existing applications to use free tier
UPDATE public.oauth_applications SET rate_limit_tier_id = (SELECT id FROM rate_limit_tiers WHERE name = 'free') WHERE rate_limit_tier_id IS NULL;

-- Add developer portal tables
CREATE TABLE public.api_documentation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  description TEXT NOT NULL,
  request_schema JSONB,
  response_schema JSONB,
  examples JSONB DEFAULT '{}',
  version TEXT NOT NULL DEFAULT '1.0',
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for API documentation
ALTER TABLE public.api_documentation ENABLE ROW LEVEL SECURITY;

-- API documentation policy
CREATE POLICY "Anyone can view public API documentation"
ON public.api_documentation
FOR SELECT
USING (is_public = true);

-- Add application analytics table
CREATE TABLE public.application_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.oauth_applications(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_requests INTEGER NOT NULL DEFAULT 0,
  successful_requests INTEGER NOT NULL DEFAULT 0,
  failed_requests INTEGER NOT NULL DEFAULT 0,
  avg_response_time_ms INTEGER NOT NULL DEFAULT 0,
  total_cost DECIMAL(10,4) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(application_id, date)
);

-- Enable RLS for application analytics
ALTER TABLE public.application_analytics ENABLE ROW LEVEL SECURITY;

-- Application analytics policy
CREATE POLICY "Application owners can view their analytics"
ON public.application_analytics
FOR SELECT
USING (application_id IN (
  SELECT id FROM oauth_applications WHERE owner_user_id = auth.uid()
));

-- Create function to update analytics
CREATE OR REPLACE FUNCTION public.update_application_analytics(
  p_application_id UUID,
  p_success BOOLEAN,
  p_response_time_ms INTEGER,
  p_cost DECIMAL(10,4) DEFAULT 0
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.application_analytics (
    application_id, date, total_requests, successful_requests, 
    failed_requests, avg_response_time_ms, total_cost
  ) VALUES (
    p_application_id, 
    CURRENT_DATE, 
    1, 
    CASE WHEN p_success THEN 1 ELSE 0 END,
    CASE WHEN p_success THEN 0 ELSE 1 END,
    p_response_time_ms,
    p_cost
  )
  ON CONFLICT (application_id, date) DO UPDATE SET
    total_requests = application_analytics.total_requests + 1,
    successful_requests = application_analytics.successful_requests + (CASE WHEN p_success THEN 1 ELSE 0 END),
    failed_requests = application_analytics.failed_requests + (CASE WHEN p_success THEN 0 ELSE 1 END),
    avg_response_time_ms = (application_analytics.avg_response_time_ms * application_analytics.total_requests + p_response_time_ms) / (application_analytics.total_requests + 1),
    total_cost = application_analytics.total_cost + p_cost;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
