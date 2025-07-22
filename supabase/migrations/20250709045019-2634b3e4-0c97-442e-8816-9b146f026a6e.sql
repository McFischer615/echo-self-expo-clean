-- Add PKCE support to oauth_authorization_codes table
ALTER TABLE public.oauth_authorization_codes 
ADD COLUMN IF NOT EXISTS code_challenge TEXT,
ADD COLUMN IF NOT EXISTS code_challenge_method TEXT DEFAULT 'plain';