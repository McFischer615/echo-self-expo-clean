-- Create user onboarding progress tracking
CREATE TABLE public.user_onboarding_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  step_name TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create echo analytics table
CREATE TABLE public.echo_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  echo_id UUID,
  interaction_type TEXT NOT NULL,
  session_id TEXT,
  response_quality_score INTEGER,
  conversation_length INTEGER,
  topics JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user settings table for preferences
CREATE TABLE public.user_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  theme TEXT DEFAULT 'system',
  help_enabled BOOLEAN DEFAULT true,
  onboarding_completed BOOLEAN DEFAULT false,
  notifications_enabled BOOLEAN DEFAULT true,
  analytics_enabled BOOLEAN DEFAULT true,
  settings_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_onboarding_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.echo_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own onboarding progress"
ON public.user_onboarding_progress
FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own analytics"
ON public.echo_analytics
FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own settings"
ON public.user_settings
FOR ALL
USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_user_settings_updated_at
BEFORE UPDATE ON public.user_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to initialize user settings
CREATE OR REPLACE FUNCTION public.initialize_user_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to initialize settings on user creation
CREATE TRIGGER on_auth_user_created_settings
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.initialize_user_settings();