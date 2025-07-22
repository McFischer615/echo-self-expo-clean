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

-- Create indexes for performance
CREATE INDEX idx_oauth_authorization_codes_code ON public.oauth_authorization_codes(code);
CREATE INDEX idx_oauth_authorization_codes_expires_at ON public.oauth_authorization_codes(expires_at);

-- Fix the API logs policy (the previous one was incorrect)
DROP POLICY IF EXISTS "System can insert API logs" ON public.oauth_tokens;

CREATE POLICY "System can insert API logs"
ON public.api_gateway_logs
FOR INSERT
WITH CHECK (true);