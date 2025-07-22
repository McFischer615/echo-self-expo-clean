-- Add missing columns to user_settings table
ALTER TABLE public.user_settings 
ADD COLUMN IF NOT EXISTS help_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS analytics_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS settings_data JSONB DEFAULT '{}'::jsonb;