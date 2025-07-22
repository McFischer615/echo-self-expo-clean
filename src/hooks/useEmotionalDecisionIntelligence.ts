import { useState, useCallback } from "react";
import { supabase } from "@/supabase/client"; // ✅ RN-safe (AsyncStorage in client.ts)
import { useEmotionalIntelligence } from "./useEmotionalIntelligence";
import { useDecisionPatterns } from "./useDecisionPatterns";
import { useEnhancedContext } from "./useEnhancedContext";

interface EmotionalDecisionPattern {
  emotion: string;
  decisionType: string;
  frequency: number;
  successRate: number;
  averageOutcomeScore: number;
  commonContexts: string[];
}

interface EmotionalDecisionPrediction {
  recommendedEmotionalState: string;
  currentEmotionImpact: "positive" | "negative" | "neutral";
  suggestedWaitTime: number;
  alternativeApproaches: string[];
  confidence: number;
  reasoning: string;
}

interface EmotionalDecisionInsight {
  insight: string;
  type: "warning" | "opportunity" | "neutral";
  actionItems: string[];
  emotionalTriggers: string[];
  supportingData: any;
}

export const useEmotionalDecisionIntelligence = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getEmotionalPatterns, analyzeEmotionalState } = useEmotionalIntelligence();
  const { getDecisionPatterns } = useDecisionPatterns();
  const { getSimilarContext } = useEnhancedContext();

  const analyzeEmotionalDecisionPatterns = useCallback(async (): Promise<EmotionalDecisionPattern[]> => {
    try {
      setIsLoading(true);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return [];

      const [emotionalPatterns, decisionPatterns] = await Promise.all([
        getEmotionalPatterns(),
        getDecisionPatterns()
      ]);

      const { data: behavioralData, error } = await supabase
        .from("behavioral_data")
        .select("*")
        .eq("user_id", user.id)
        .in("data_type", ["emotional_state", "decision_pattern"])
        .order("created_at", { ascending: false })
        .limit(200);

      if (error || !behavioralData) return [];

      const correlations: any[] = [];
      const emotionalEntries = behavioralData.filter((d) => d.data_type === "emotional_state");
      const decisionEntries = behavioralData.filter((d) => d.data_type === "decision_pattern");

      decisionEntries.forEach((decision) => {
        const decisionTime = new Date(decision.created_at).getTime();
        const nearbyEmotions = emotionalEntries.filter((emotion) => {
          const emotionTime = new Date(emotion.created_at).getTime();
          return Math.abs(decisionTime - emotionTime) <= 2 * 60 * 60 * 1000;
        });

        if (nearbyEmotions.length > 0) {
          const primaryEmotion = nearbyEmotions[0].data_value as any;
          const decisionData = decision.data_value as any;
          correlations.push({
            emotion: primaryEmotion.primary_emotion,
            decisionType: decisionData.pattern_type || "general",
            outcome: decisionData.outcome,
            context: decisionData.context
          });
        }
      });

      const patterns = correlations.reduce((acc, correlation) => {
        const key = `${correlation.emotion}_${correlation.decisionType}`;
        if (!acc[key]) {
          acc[key] = {
            emotion: correlation.emotion,
            decisionType: correlation.decisionType,
            outcomes: [],
            contexts: []
          };
        }
        acc[key].outcomes.push(correlation.outcome);
        acc[key].contexts.push(correlation.context);
        return acc;
      }, {} as Record<string, any>);

      return Object.values(patterns)
        .map((pattern: any) => {
          const successfulOutcomes = pattern.outcomes.filter((o: string) =>
            o.includes("success") || o.includes("positive")
          );
          return {
            emotion: pattern.emotion,
            decisionType: pattern.decisionType,
            frequency: pattern.outcomes.length,
            successRate:
              pattern.outcomes.length > 0
                ? successfulOutcomes.length / pattern.outcomes.length
                : 0,
            averageOutcomeScore: calculateOutcomeScore(pattern.outcomes),
            commonContexts: [...new Set(pattern.contexts.filter(Boolean))].slice(0, 3)
          };
        })
        .filter((p) => p.frequency >= 2);
    } catch (error: any) {
      console.error("Error analyzing emotional decision patterns:", JSON.stringify(error));
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [getEmotionalPatterns, getDecisionPatterns]);

  const predictOptimalEmotionalState = useCallback(
    async (
      decisionContext: string,
      currentMessage: string
    ): Promise<EmotionalDecisionPrediction> => {
      try {
        const currentEmotion = analyzeEmotionalState(currentMessage);
        const patterns = await analyzeEmotionalDecisionPatterns();
        const contextType = categorizeDecisionContext(decisionContext);
        const relevantPatterns = patterns.filter((p) => p.decisionType === contextType);

        if (relevantPatterns.length === 0) {
          return {
            recommendedEmotionalState: "calm",
            currentEmotionImpact: "neutral",
            suggestedWaitTime: 0,
            alternativeApproaches: ["Gather more information", "Consult with others"],
            confidence: 0.3,
            reasoning: "Limited data for this decision type"
          };
        }

        const bestPattern = relevantPatterns.reduce((best, current) =>
          current.successRate > best.successRate ? current : best
        );

        const currentPattern = relevantPatterns.find(
          (p) => p.emotion === currentEmotion.primary_emotion
        );
        let currentEmotionImpact: "positive" | "negative" | "neutral" = "neutral";

        if (currentPattern) {
          if (currentPattern.successRate > 0.6) currentEmotionImpact = "positive";
          else if (currentPattern.successRate < 0.4) currentEmotionImpact = "negative";
        }

        let suggestedWaitTime = 0;
        if (currentEmotionImpact === "negative" && currentEmotion.intensity > 0.7) {
          suggestedWaitTime = Math.round(currentEmotion.intensity * 60);
        }

        const alternativeApproaches: string[] = [];
        if (currentEmotionImpact === "negative") {
          alternativeApproaches.push("Take time to cool down before deciding");
          alternativeApproaches.push("Discuss with a trusted advisor");
        }
        if (bestPattern.emotion !== currentEmotion.primary_emotion) {
          alternativeApproaches.push(
            `Try to achieve a ${bestPattern.emotion} state before deciding`
          );
        }

        const confidence = Math.min(relevantPatterns.length / 10, 1.0);

        return {
          recommendedEmotionalState: bestPattern.emotion,
          currentEmotionImpact,
          suggestedWaitTime,
          alternativeApproaches,
          confidence,
          reasoning: `Based on ${relevantPatterns.length} similar decisions, ${bestPattern.emotion} state has ${(bestPattern.successRate * 100).toFixed(0)}% success rate`
        };
      } catch (error: any) {
        console.error("Error predicting optimal emotional state:", JSON.stringify(error));
        return {
          recommendedEmotionalState: "calm",
          currentEmotionImpact: "neutral",
          suggestedWaitTime: 0,
          alternativeApproaches: ["Take a moment to reflect"],
          confidence: 0,
          reasoning: "Unable to analyze emotional patterns"
        };
      }
    },
    [analyzeEmotionalState, analyzeEmotionalDecisionPatterns]
  );

  const generateEmotionalDecisionInsights = useCallback(async (): Promise<EmotionalDecisionInsight[]> => {
    try {
      const patterns = await analyzeEmotionalDecisionPatterns();
      const insights: EmotionalDecisionInsight[] = [];
      // Keep your original logic here or expand later
      return insights.slice(0, 5);
    } catch (error: any) {
      console.error("Error generating emotional decision insights:", JSON.stringify(error));
      return [];
    }
  }, [analyzeEmotionalDecisionPatterns]);

  const trackEmotionalDecisionOutcome = useCallback(
    async (decisionContext: string, emotionalState: string, outcome: string): Promise<boolean> => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return false;

        await supabase.from("behavioral_data").insert({
          user_id: user.id,
          data_type: "emotional_decision_correlation",
          data_value: {
            decision_context: decisionContext,
            emotional_state: emotionalState,
            outcome,
            timestamp: new Date().toISOString()
          }
        });

        return true;
      } catch (error: any) {
        console.error("Error tracking emotional decision outcome:", JSON.stringify(error));
        return false;
      }
    },
    []
  );

  const categorizeDecisionContext = (context: string): string => {
    const workKeywords = ["project", "meeting", "deadline", "work", "job", "career"];
    const personalKeywords = ["family", "relationship", "health", "money", "hobby"];
    const learningKeywords = ["study", "learn", "course", "skill", "education"];
    const lower = context.toLowerCase();
    if (workKeywords.some((k) => lower.includes(k))) return "work";
    if (personalKeywords.some((k) => lower.includes(k))) return "personal";
    if (learningKeywords.some((k) => lower.includes(k))) return "learning";
    return "general";
  };

  const calculateOutcomeScore = (outcomes: string[]): number =>
    outcomes.reduce((sum, outcome) => {
      if (outcome.includes("success") || outcome.includes("excellent")) return sum + 1;
      if (outcome.includes("good") || outcome.includes("positive")) return sum + 0.7;
      if (outcome.includes("neutral") || outcome.includes("okay")) return sum + 0.5;
      if (outcome.includes("poor") || outcome.includes("negative")) return sum + 0.3;
      if (outcome.includes("failure") || outcome.includes("disaster")) return sum + 0;
      return sum + 0.5;
    }, 0) / (outcomes.length || 1);

  return {
    isLoading,
    analyzeEmotionalDecisionPatterns,
    predictOptimalEmotionalState,
    generateEmotionalDecisionInsights,
    trackEmotionalDecisionOutcome
  };
};
