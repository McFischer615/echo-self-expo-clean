import { useState, useCallback } from "react";
import { supabase } from "@/supabase/client"; // ✅ RN-safe (AsyncStorage-backed)
import { useEnhancedContext } from "./useEnhancedContext";
import { useDecisionPatterns } from "./useDecisionPatterns";

interface DecisionPrediction {
  predictedOutcome: string;
  confidence: number;
  reasoning: string;
  similarDecisions: any[];
  riskFactors: string[];
  recommendations: string[];
}

interface DecisionAnalytics {
  totalDecisions: number;
  successRate: number;
  topPatterns: Array<{
    type: string;
    frequency: number;
    successRate: number;
  }>;
  recentTrends: Array<{
    date: string;
    decisionsCount: number;
    successRate: number;
  }>;
  decisionVelocity: number;
  contextualFactors: Array<{
    factor: string;
    impact: number;
    frequency: number;
  }>;
}

export const useEnhancedDecisionPatterns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getSimilarContext } = useEnhancedContext();
  const { getDecisionPatterns } = useDecisionPatterns();

  /** ✅ Predict decision outcome using past patterns + semantic context */
  const predictDecisionOutcome = useCallback(
    async (decisionContext: string, proposedChoice: string): Promise<DecisionPrediction> => {
      try {
        setIsLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          return {
            predictedOutcome: "unknown",
            confidence: 0,
            reasoning: "User not authenticated",
            similarDecisions: [],
            riskFactors: [],
            recommendations: [],
          };
        }

        const similarContexts = await getSimilarContext(
          `Decision: ${decisionContext} | Choice: ${proposedChoice}`,
          10,
          0.5
        );

        const patterns = await getDecisionPatterns();
        const relevantPatterns = patterns.filter(
          (p) =>
            p.decision_context.toLowerCase().includes(decisionContext.toLowerCase()) ||
            decisionContext.toLowerCase().includes(p.decision_context.toLowerCase())
        );

        const successfulChoices = relevantPatterns.filter(
          (p) => p.outcome.includes("success") || p.outcome.includes("positive")
        );

        const baseConfidence =
          relevantPatterns.length > 0
            ? (successfulChoices.length / relevantPatterns.length) * 0.8
            : 0.3;

        const contextBoost = Math.min(similarContexts.length * 0.05, 0.2);
        const confidence = Math.min(baseConfidence + contextBoost, 1.0);

        let predictedOutcome = "proceed with caution";
        if (confidence > 0.7) predictedOutcome = "highly likely positive outcome";
        else if (confidence > 0.5) predictedOutcome = "likely positive outcome";
        else if (confidence > 0.3) predictedOutcome = "mixed outcome expected";

        const riskFactors: string[] = [];
        if (relevantPatterns.some((p) => p.outcome.includes("failure"))) {
          riskFactors.push("Previous similar decisions had negative outcomes");
        }
        if (confidence < 0.4) {
          riskFactors.push("Limited historical data for similar decisions");
        }
        if (decisionContext.toLowerCase().includes("urgent")) {
          riskFactors.push("Time pressure may affect decision quality");
        }

        const recommendations: string[] = [];
        if (confidence > 0.6) {
          recommendations.push("Historical patterns support this decision approach");
        } else {
          recommendations.push("Consider gathering more information before deciding");
        }
        if (similarContexts.length > 3) {
          recommendations.push("Review similar past decisions for additional insights");
        }

        const reasoning =
          relevantPatterns.length > 0
            ? `Based on ${relevantPatterns.length} similar decisions, ${successfulChoices.length} had positive outcomes. Confidence boosted by ${similarContexts.length} similar situations.`
            : "Limited historical data available for this decision type";

        return {
          predictedOutcome,
          confidence,
          reasoning,
          similarDecisions: relevantPatterns.slice(0, 3),
          riskFactors,
          recommendations,
        };
      } catch (error: any) {
        console.error("Error predicting decision outcome:", JSON.stringify(error));
        return {
          predictedOutcome: "error",
          confidence: 0,
          reasoning: "Unable to analyze decision patterns",
          similarDecisions: [],
          riskFactors: ["Analysis error occurred"],
          recommendations: ["Try again or seek human advice"],
        };
      } finally {
        setIsLoading(false);
      }
    },
    [getSimilarContext, getDecisionPatterns]
  );

  /** ✅ Summarize decision analytics for dashboards */
  const getDecisionAnalytics = useCallback(async (): Promise<DecisionAnalytics> => {
    try {
      const patterns = await getDecisionPatterns();
      const totalDecisions = patterns.length;
      const successful = patterns.filter(
        (p) => p.outcome.includes("success") || p.outcome.includes("positive")
      ).length;

      const successRate = totalDecisions > 0 ? successful / totalDecisions : 0;
      const grouped = patterns.reduce((acc, p) => {
        if (!acc[p.pattern_type]) acc[p.pattern_type] = [];
        acc[p.pattern_type].push(p);
        return acc;
      }, {} as Record<string, typeof patterns>);

      const topPatterns = Object.entries(grouped)
        .map(([type, list]) => ({
          type,
          frequency: list.length,
          successRate:
            list.filter((p) => p.outcome.includes("success") || p.outcome.includes("positive"))
              .length / list.length,
        }))
        .sort((a, b) => b.frequency - a.frequency)
        .slice(0, 5);

      const recentTrends: DecisionAnalytics["recentTrends"] = [];
      const now = new Date();
      for (let i = 3; i >= 0; i--) {
        const start = new Date(now);
        start.setDate(now.getDate() - i * 7);
        const end = new Date(start);
        end.setDate(start.getDate() + 7);

        const weekPatterns = patterns.filter((p) => {
          const d = new Date(p.created_at);
          return d >= start && d < end;
        });

        const weekSuccess = weekPatterns.filter(
          (p) => p.outcome.includes("success") || p.outcome.includes("positive")
        ).length;

        recentTrends.push({
          date: start.toISOString().split("T")[0],
          decisionsCount: weekPatterns.length,
          successRate: weekPatterns.length > 0 ? weekSuccess / weekPatterns.length : 0,
        });
      }

      const recentDecisions = patterns.filter((p) => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(p.created_at) > weekAgo;
      });

      const decisionVelocity = recentDecisions.length;

      const contexts = patterns.map((p) => p.decision_context.toLowerCase());
      const commonWords = ["work", "personal", "financial", "health", "relationship", "career"];
      const contextualFactors = commonWords
        .map((word) => {
          const frequency = contexts.filter((c) => c.includes(word)).length;
          if (frequency === 0) return null;
          const successCount = patterns.filter(
            (p) =>
              p.decision_context.toLowerCase().includes(word) &&
              (p.outcome.includes("success") || p.outcome.includes("positive"))
          ).length;
          return { factor: word, impact: successCount / frequency, frequency };
        })
        .filter(Boolean)
        .sort((a, b) => (b?.frequency || 0) - (a?.frequency || 0))
        .slice(0, 5) as DecisionAnalytics["contextualFactors"];

      return {
        totalDecisions,
        successRate,
        topPatterns,
        recentTrends,
        decisionVelocity,
        contextualFactors,
      };
    } catch (error: any) {
      console.error("Error getting decision analytics:", JSON.stringify(error));
      return {
        totalDecisions: 0,
        successRate: 0,
        topPatterns: [],
        recentTrends: [],
        decisionVelocity: 0,
        contextualFactors: [],
      };
    }
  }, [getDecisionPatterns]);

  /** ✅ Analyze key decision context factors */
  const analyzeDecisionFactors = useCallback(
    async (
      decisionContext: string
    ): Promise<
      Array<{ factor: string; influence: "positive" | "negative" | "neutral"; strength: number; explanation: string }>
    > => {
      try {
        const patterns = await getDecisionPatterns();
        const factors: any[] = [];
        const urgentKeywords = ["urgent", "immediate", "asap", "deadline", "quickly"];

        if (urgentKeywords.some((k) => decisionContext.toLowerCase().includes(k))) {
          const urgent = patterns.filter((p) =>
            urgentKeywords.some((k) => p.decision_context.toLowerCase().includes(k))
          );
          const successRate =
            urgent.length > 0
              ? urgent.filter((p) => p.outcome.includes("success")).length / urgent.length
              : 0.5;

          factors.push({
            factor: "Time Pressure",
            influence:
              successRate > 0.6 ? "positive" : successRate < 0.4 ? "negative" : "neutral",
            strength: Math.abs(successRate - 0.5) * 2,
            explanation: `Your urgent decisions have a ${(successRate * 100).toFixed(0)}% success rate`,
          });
        }

        return factors;
      } catch (error: any) {
        console.error("Error analyzing decision factors:", JSON.stringify(error));
        return [];
      }
    },
    [getDecisionPatterns]
  );

  return {
    isLoading,
    predictDecisionOutcome,
    getDecisionAnalytics,
    analyzeDecisionFactors,
  };
};
