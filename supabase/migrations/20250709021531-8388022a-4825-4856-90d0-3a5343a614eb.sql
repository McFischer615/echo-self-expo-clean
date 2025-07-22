-- Create daily behavioral stats table for tracking extension usage
CREATE TABLE public.daily_behavioral_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  interactions INTEGER NOT NULL DEFAULT 0,
  words INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE public.daily_behavioral_stats ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own daily stats"
ON public.daily_behavioral_stats
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can insert daily stats"
ON public.daily_behavioral_stats
FOR INSERT
WITH CHECK (true);

CREATE POLICY "System can update daily stats"
ON public.daily_behavioral_stats
FOR UPDATE
USING (true);

-- Create trigger for updating timestamp
CREATE TRIGGER update_daily_behavioral_stats_updated_at
  BEFORE UPDATE ON public.daily_behavioral_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();