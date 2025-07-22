import { useState, useCallback } from "react";
import { supabase } from "@/supabase/client"; // ✅ Ensure this uses AsyncStorage in client.ts
import type { Json } from "@/supabase/types";

interface ContextualMemory {
  relationship_context: Json;
  personal_history: Json;
  emotional_state: Json;
  topic_threads: Json;
  context_importance_scores: Json;
}

interface RelationshipMemory {
  id: string;
  relationship_type: string;
  entity_name: string;
  relationship_data: Json;
  interaction_frequency: number;
  emotional_valence: number;
  last_interaction_at: string;
}

interface SimilarContext {
  conversation_id: string;
  content_text: string;
  content_type: string;
  importance_score: number;
  similarity: number;
  created_at: string;
}

export const useEnhancedContext = () => {
  const [isLoading, setIsLoading] = useState(false);

  /** ✅ Generate embeddings via Supabase Edge Function */
  const generateContextEmbedding = useCallback(async (text: string): Promise<number[]> => {
    try {
      const { data, error } = await supabase.functions.invoke("generate-embeddings", {
        body: { text },
      });

      if (error || !data?.embedding) {
        console.error("Error generating embedding:", error?.message || JSON.stringify(error));
        return [];
      }

      return data.embedding;
    } catch (error: any) {
      console.error("Error in generateContextEmbedding:", JSON.stringify(error));
      return [];
    }
  }, []);

  /** ✅ Update contextual memory for a conversation */
  const updateContextualMemory = useCallback(
    async (conversationId: string, contextUpdate: Partial<ContextualMemory>) => {
      try {
        setIsLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return null;

        const { data, error } = await supabase
          .from("ai_conversation_contexts")
          .upsert(
            {
              user_id: user.id,
              conversation_id: conversationId,
              ...contextUpdate,
              last_interaction_at: new Date().toISOString(),
            },
            { onConflict: "user_id,conversation_id" }
          )
          .select()
          .single();

        if (error) {
          console.error("Error updating contextual memory:", error.message);
          return null;
        }

        return data;
      } catch (error: any) {
        console.error("Error in updateContextualMemory:", JSON.stringify(error));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /** ✅ Update relationship memory via RPC */
  const updateRelationshipMemory = useCallback(
    async (
      relationshipType: string,
      entityName: string,
      relationshipData: Record<string, any>,
      emotionalValence: number = 0.0
    ) => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return null;

        const { data, error } = await supabase.rpc("update_relationship_memory", {
          p_user_id: user.id,
          p_relationship_type: relationshipType,
          p_entity_name: entityName,
          p_relationship_data: relationshipData,
          p_emotional_valence: emotionalValence,
        });

        if (error) {
          console.error("Error updating relationship memory:", error.message);
          return null;
        }

        return data;
      } catch (error: any) {
        console.error("Error in updateRelationshipMemory:", JSON.stringify(error));
        return null;
      }
    },
    []
  );

  /** ✅ Store a context embedding for semantic memory */
  const storeContextEmbedding = useCallback(
    async (
      conversationId: string,
      contentText: string,
      contentType: string,
      importanceScore: number = 0.5
    ) => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return null;

        const embedding = await generateContextEmbedding(contentText);
        if (!embedding.length) return null;

        const { data, error } = await supabase.rpc("store_context_embedding", {
          p_user_id: user.id,
          p_conversation_id: conversationId,
          p_content_text: contentText,
          p_embedding: `[${embedding.join(",")}]`,
          p_content_type: contentType,
          p_importance_score: importanceScore,
        });

        if (error) {
          console.error("Error storing context embedding:", error.message);
          return null;
        }

        return data;
      } catch (error: any) {
        console.error("Error in storeContextEmbedding:", JSON.stringify(error));
        return null;
      }
    },
    [generateContextEmbedding]
  );

  /** ✅ Retrieve similar contexts via RPC vector search */
  const getSimilarContext = useCallback(
    async (
      queryText: string,
      limit: number = 5,
      similarityThreshold: number = 0.7
    ): Promise<SimilarContext[]> => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return [];

        const queryEmbedding = await generateContextEmbedding(queryText);
        if (!queryEmbedding.length) return [];

        const { data, error } = await supabase.rpc("get_similar_context", {
          p_user_id: user.id,
          p_query_embedding: `[${queryEmbedding.join(",")}]`,
          p_limit: limit,
          p_similarity_threshold: similarityThreshold,
        });

        if (error) {
          console.error("Error getting similar context:", error.message);
          return [];
        }

        return data || [];
      } catch (error: any) {
        console.error("Error in getSimilarContext:", JSON.stringify(error));
        return [];
      }
    },
    [generateContextEmbedding]
  );

  return {
    isLoading,
    updateContextualMemory,
    updateRelationshipMemory,
    storeContextEmbedding,
    getSimilarContext,
  };
};
