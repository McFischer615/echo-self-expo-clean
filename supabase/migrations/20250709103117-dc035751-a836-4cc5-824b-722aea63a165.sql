-- Enhanced Contextual Memory Phase 1: Extended Context Architecture

-- Enable pgvector extension for vector operations
CREATE EXTENSION IF NOT EXISTS vector;

-- Expand ai_conversation_contexts table with enhanced fields
ALTER TABLE public.ai_conversation_contexts 
ADD COLUMN IF NOT EXISTS relationship_context JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS personal_history JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS context_embeddings vector(1536),
ADD COLUMN IF NOT EXISTS context_importance_scores JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS emotional_state JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS topic_threads JSONB DEFAULT '[]'::jsonb;

-- Create ai_relationship_memory table for scalable relationship tracking
CREATE TABLE IF NOT EXISTS public.ai_relationship_memory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  relationship_type TEXT NOT NULL,
  entity_name TEXT NOT NULL,
  relationship_data JSONB DEFAULT '{}'::jsonb,
  interaction_frequency INTEGER DEFAULT 0,
  emotional_valence NUMERIC DEFAULT 0.0,
  last_interaction_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_context_embeddings table for efficient vector operations
CREATE TABLE IF NOT EXISTS public.ai_context_embeddings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  conversation_id TEXT NOT NULL,
  content_text TEXT NOT NULL,
  embedding vector(1536),
  content_type TEXT NOT NULL,
  importance_score NUMERIC DEFAULT 0.5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.ai_relationship_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_context_embeddings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own relationship memory"
ON public.ai_relationship_memory
FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own context embeddings"
ON public.ai_context_embeddings
FOR ALL
USING (auth.uid() = user_id);

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_ai_conversation_contexts_embeddings 
ON public.ai_conversation_contexts USING ivfflat (context_embeddings vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_ai_context_embeddings_vector 
ON public.ai_context_embeddings USING ivfflat (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_ai_relationship_memory_user_type 
ON public.ai_relationship_memory (user_id, relationship_type);

CREATE INDEX IF NOT EXISTS idx_ai_context_embeddings_user_conversation 
ON public.ai_context_embeddings (user_id, conversation_id);

-- Create function to update relationship memory
CREATE OR REPLACE FUNCTION public.update_relationship_memory(
  p_user_id UUID,
  p_relationship_type TEXT,
  p_entity_name TEXT,
  p_relationship_data JSONB,
  p_emotional_valence NUMERIC DEFAULT 0.0
) RETURNS UUID AS $$
DECLARE
  v_relationship_id UUID;
BEGIN
  INSERT INTO public.ai_relationship_memory (
    user_id, relationship_type, entity_name, relationship_data, 
    emotional_valence, interaction_frequency, last_interaction_at
  ) VALUES (
    p_user_id, p_relationship_type, p_entity_name, p_relationship_data,
    p_emotional_valence, 1, now()
  )
  ON CONFLICT (user_id, relationship_type, entity_name) 
  DO UPDATE SET
    relationship_data = EXCLUDED.relationship_data,
    emotional_valence = (ai_relationship_memory.emotional_valence + EXCLUDED.emotional_valence) / 2,
    interaction_frequency = ai_relationship_memory.interaction_frequency + 1,
    last_interaction_at = now(),
    updated_at = now()
  RETURNING id INTO v_relationship_id;
  
  RETURN v_relationship_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to store context embeddings
CREATE OR REPLACE FUNCTION public.store_context_embedding(
  p_user_id UUID,
  p_conversation_id TEXT,
  p_content_text TEXT,
  p_embedding vector(1536),
  p_content_type TEXT,
  p_importance_score NUMERIC DEFAULT 0.5
) RETURNS UUID AS $$
DECLARE
  v_embedding_id UUID;
BEGIN
  INSERT INTO public.ai_context_embeddings (
    user_id, conversation_id, content_text, embedding, 
    content_type, importance_score
  ) VALUES (
    p_user_id, p_conversation_id, p_content_text, p_embedding,
    p_content_type, p_importance_score
  ) RETURNING id INTO v_embedding_id;
  
  RETURN v_embedding_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to retrieve similar context
CREATE OR REPLACE FUNCTION public.get_similar_context(
  p_user_id UUID,
  p_query_embedding vector(1536),
  p_limit INTEGER DEFAULT 5,
  p_similarity_threshold NUMERIC DEFAULT 0.7
) RETURNS TABLE (
  conversation_id TEXT,
  content_text TEXT,
  content_type TEXT,
  importance_score NUMERIC,
  similarity NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ace.conversation_id,
    ace.content_text,
    ace.content_type,
    ace.importance_score,
    (1 - (ace.embedding <=> p_query_embedding)) as similarity,
    ace.created_at
  FROM public.ai_context_embeddings ace
  WHERE ace.user_id = p_user_id
    AND (1 - (ace.embedding <=> p_query_embedding)) > p_similarity_threshold
  ORDER BY ace.embedding <=> p_query_embedding
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add triggers for updated_at columns
CREATE TRIGGER update_ai_relationship_memory_updated_at
BEFORE UPDATE ON public.ai_relationship_memory
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();