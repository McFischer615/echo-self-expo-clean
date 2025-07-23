import { useState, useCallback } from "react";
import { supabase } from "@/supabase/client"; // ✅ Ensure RN-safe (AsyncStorage in client)
import { useEnhancedContext } from "./useEnhancedContext";

interface DecisionPattern {
  id: string;
  pattern_type: string;
  decision_context: string;
  outcome: string;
  confidence_score: number;
  frequency: number;
  created_at: string;
}

interface DecisionSuggestion {
  suggestion: string;
  confidence: number;
  reasoning: string;
  similar_patterns: DecisionPattern[];
}

export const useDecisionPatterns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getSimilarContext, storeContextEmbedding } = useEnhancedContext();

  /** ✅ Store new decision pattern */
  const analyzeDecisionPattern = useCallback(
    async (decisionContext: string, userChoice: string, outcome: string): Promise<string | null> => {
      try {
        setIsLoading(true);

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return null;

        const { data, error } = await supabase
          .from("behavioral_data")
          .insert({
            user_id: user.id,
            data_type: "decision_pattern",
            data_value: {
              context: decisionContext,
              choice: userChoice,
              outcome,
              timestamp: new Date().toISOString(),
              pattern_type: categorizeDecision(decisionContext),
            },
          })
          .select()
          .single();

        if (error) {
          console.error("Error storing decision pattern:", error.message);
          return null;
        }

        // ✅ Store embedding for context similarity search
        await storeContextEmbedding(
          `decision_${Date.now()}`,
          `Decision: ${decisionContext} | Choice: ${userChoice} | Outcome: ${outcome}`,
          "decision_pattern",
          0.8
        );

        return data.id;
      } catch (err: any) {
        console.error("Error in analyzeDecisionPattern:", JSON.stringify(err));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [storeContextEmbedding]
  );

  /** ✅ Generate suggestions based on patterns & similar contexts */
  const getDecisionSuggestions = useCallback(
    async (currentContext: string): Promise<DecisionSuggestion[]> => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return [];

        const similarContexts = await getSimilarContext(
          `Decision context: ${currentContext}`,
          5,
          0.6
        );

        const { data: decisionPatterns, error } = await supabase
          .from("behavioral_data")
          .select("*")
          .eq("user_id", user.id)
          .eq("data_type", "decision_pattern")
          .order("created_at", { ascending: false })
          .limit(20);

        if (error || !decisionPatterns) return [];

        return generateDecisionSuggestions(currentContext, decisionPatterns, similarContexts);
      } catch (err: any) {
        console.error("Error getting decision suggestions:", JSON.stringify(err));
        return [];
      }
    },
    [getSimilarContext]
  );

  /** ✅ Fetch stored decision patterns */
  const getDecisionPatterns = useCallback(async (): Promise<DecisionPattern[]> => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return [];

      const { data: patterns, error } = await supabase
        .from("behavioral_data")
        .select("*")
        .eq("user_id", user.id)
        .eq("data_type", "decision_pattern")
        .order("created_at", { ascending: false });

      if (error || !patterns) return [];

      return patterns.map((pattern: any) => {
        const dataValue = pattern.data_value || {};
        return {
          id: pattern.id,
          pattern_type: dataValue.pattern_type || "general",
          decision_context: dataValue.context || "",
          outcome: dataValue.outcome || "",
          confidence_score: calculateConfidenceScore(dataValue),
          frequency: 1,
          created_at: pattern.created_at,
        };
      });
    } catch (err: any) {
      console.error("Error getting decision patterns:", JSON.stringify(err));
      return [];
    }
  }, []);

  /** ✅ Helpers */
  const categorizeDecision = (context: string): string => {
    const workKeywords = ["project", "meeting", "deadline", "work", "job", "career"];
    const personalKeywords = ["family", "relationship", "health", "money", "hobby"];
    const learningKeywords = ["study", "learn", "course", "skill", "education"];
    const lowerContext = context.toLowerCase();

    if (workKeywords.some((k) => lowerContext.includes(k))) return "work";
    if (personalKeywords.some((k) => lowerContext.includes(k))) return "personal";
    if (learningKeywords.some((k) => lowerContext.includes(k))) return "learning";
    return "general";
  };

  const calculateConfidenceScore = (decisionData: any): number => {
    let score = 0.5;
    if (decisionData.outcome?.includes("success")) score += 0.3;
    if (decisionData.context?.length > 20) score += 0.2;
    return Math.min(score, 1.0);
  };

  const generateDecisionSuggestions = (
    currentContext: string,
    patterns: any[],
    similarContexts: any[]
  ): DecisionSuggestion[] => {
    const suggestions: DecisionSuggestion[] = [];
    const patternsByType = patterns.reduce((acc, p) => {
      const type = p.data_value?.pattern_type || "general";
      if (!acc[type]) acc[type] = [];
      acc[type].push(p);
      return acc;
    }, {} as Record<string, any[]>);

    Object.entries(patternsByType).forEach(([type, typePatterns]) => {
      const successfulPatterns = typePatterns.filter((p) =>
        p.data_value?.outcome?.includes("success")
      );

      if (successfulPatterns.length > 0) {
        const mostCommonChoice = findMostCommonChoice(successfulPatterns);
        suggestions.push({
          suggestion: `Based on your ${type} decisions, consider: ${mostCommonChoice}`,
          confidence: successfulPatterns.length / typePatterns.length,
          reasoning: `You've had success with similar ${type} decisions ${successfulPatterns.length} times`,
          similar_patterns: successfulPatterns.slice(0, 3).map((p) => ({
            id: p.id,
            pattern_type: type,
            decision_context: p.data_value?.context || "",
            outcome: p.data_value?.outcome || "",
            confidence_score: calculateConfidenceScore(p.data_value),
            frequency: 1,
            created_at: p.created_at,
          })),
        });
      }
    });

    return suggestions.slice(0, 3);
  };

  const findMostCommonChoice = (patterns: any[]): string => {
    const choices = patterns.map((p) => p.data_value?.choice).filter(Boolean);
    const counts = choices.reduce((acc, c) => {
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).sort(([, a], [, b]) => b - a)[0]?.[0] || "proceed carefully";
  };

  return { isLoading, analyzeDecisionPattern, getDecisionSuggestions, getDecisionPatterns };
};
