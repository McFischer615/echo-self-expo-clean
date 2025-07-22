-- Add voice cloning capabilities to twins table
ALTER TABLE twins ADD COLUMN voice_model_id text;
ALTER TABLE twins ADD COLUMN voice_samples jsonb DEFAULT '[]'::jsonb;
ALTER TABLE twins ADD COLUMN voice_settings jsonb DEFAULT '{}'::jsonb;

-- Add voice-related columns to ai_host_interactions for voice responses
ALTER TABLE ai_host_interactions ADD COLUMN voice_audio_url text;
ALTER TABLE ai_host_interactions ADD COLUMN voice_enabled boolean DEFAULT false;