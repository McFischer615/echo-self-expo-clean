-- Create user onboarding progress tracking (if not exists)
CREATE TABLE IF NOT EXISTS public.user_onboarding_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  step_name TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create echo analytics table (if not exists)
CREATE TABLE IF NOT EXISTS public.echo_analytics (
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

-- Enable RLS on new tables
ALTER TABLE public.user_onboarding_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.echo_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for new tables
CREATE POLICY "Users can manage their own onboarding progress"
ON public.user_onboarding_progress
FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own analytics"
ON public.echo_analytics
FOR ALL
USING (auth.uid() = user_id);