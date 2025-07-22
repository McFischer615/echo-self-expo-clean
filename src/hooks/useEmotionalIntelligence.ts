import { useState, useCallback } from "react";
import { supabase } from "@/supabase/client"; // ✅ RN-safe with AsyncStorage in client.ts
import { useEnhancedContext } from "./useEnhancedContext";

interface EmotionalState {
  primary_emotion: string;
  intensity: number;
  context: string;
  triggers: string[];
  timestamp: string;
}

interface EmotionalPattern {
  emotion: string;
  frequency: number;
  contexts: string[];
  average_intensity: number;
  trend: "increasing" | "decreasing" | "stable";
}

interface EmotionalInsight {
  insight: string;
  confidence: number;
  recommendation: string;
  emotional_state: EmotionalState;
}

export const useEmotionalIntelligence = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateContextualMemory, storeContextEmbedding } = useEnhancedContext();

  /** ✅ Basic keyword-based emotion analyzer */
  const analyzeEmotionalState = useCallback((text: string): EmotionalState => {
    const emotionKeywords = {
      happy: ["happy", "joy", "excited", "great", "awesome", "wonderful", "amazing"],
      sad: ["sad", "depressed", "down", "unhappy", "miserable", "disappointed"],
      angry: ["angry", "mad", "furious", "annoyed", "frustrated", "irritated"],
      anxious: ["worried", "nervous", "anxious", "stressed", "concerned", "scared"],
      confident: ["confident", "sure", "certain", "capable", "strong", "determined"],
      confused: ["confused", "uncertain", "unclear", "lost", "puzzled", "bewildered"],
    };

    const lower = text.toLowerCase();
    const scores: Record<string, number> = {};

    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      scores[emotion] = keywords.filter((k) => lower.includes(k)).length;
    });

    const primary = Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] || "neutral";
    const intensity = Math.min((scores[primary] || 0) / 3, 1.0);

    return {
      primary_emotion: primary,
      intensity,
      context: text,
      triggers: extractEmotionalTriggers(text),
      timestamp: new Date().toISOString(),
    };
  }, []);

  /** ✅ Store emotional state and update context memory */
  const trackEmotionalState = useCallback(
    async (conversationId: string, emotionalState: EmotionalState): Promise<boolean> => {
      try {
        setIsLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return false;

        await supabase.from("behavioral_data").insert({
          user_id: user.id,
          data_type: "emotional_state",
          data_value: emotionalState,
        });

        await updateContextualMemory(conversationId, {
          emotional_state: emotionalState,
          personal_history: {},
          relationship_context: {},
          topic_threads: [],
        });

        await storeContextEmbedding(
          conversationId,
          `Emotion: ${emotionalState.primary_emotion} | Context: ${emotionalState.context}`,
          "emotional_state",
          0.7
        );

        return true;
      } catch (error: any) {
        console.error("Error tracking emotional state:", JSON.stringify(error));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [updateContextualMemory, storeContextEmbedding]
  );

  /** ✅ Fetch and summarize emotional patterns */
  const getEmotionalPatterns = useCallback(async (): Promise<EmotionalPattern[]> => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return [];

      const { data: emotions, error } = await supabase
        .from("behavioral_data")
        .select("*")
        .eq("user_id", user.id)
        .eq("data_type", "emotional_state")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error || !emotions) return [];

      const grouped = emotions.reduce((acc, e) => {
        const state = e.data_value as any;
        const type = state?.primary_emotion || "neutral";
        if (!acc[type]) acc[type] = [];
        acc[type].push(state);
        return acc;
      }, {} as Record<string, any[]>);

      return Object.entries(grouped).map(([emotion, states]) => ({
        emotion,
        frequency: states.length,
        contexts: [...new Set(states.map((s) => s.context).filter(Boolean))].slice(0, 5),
        average_intensity:
          states.reduce((sum, s) => sum + (s.intensity || 0), 0) / states.length,
        trend: calculateEmotionalTrend(states),
      }));
    } catch (error: any) {
      console.error("Error getting emotional patterns:", JSON.stringify(error));
      return [];
    }
  }, []);

  /** ✅ Generate immediate emotional insights */
  const generateEmotionalInsights = useCallback(
    async (currentEmotionalState: EmotionalState): Promise<EmotionalInsight[]> => {
      try {
        const patterns = await getEmotionalPatterns();
        const insights: EmotionalInsight[] = [];

        patterns.forEach((pattern) => {
          if (pattern.emotion === currentEmotionalState.primary_emotion) {
            const insight = generateInsightForEmotion(pattern, currentEmotionalState);
            if (insight) insights.push(insight);
          }
        });

        const overall = generateOverallEmotionalInsight(patterns, currentEmotionalState);
        if (overall) insights.push(overall);

        return insights.slice(0, 3);
      } catch (error: any) {
        console.error("Error generating emotional insights:", JSON.stringify(error));
        return [];
      }
    },
    [getEmotionalPatterns]
  );

  /** ✅ Helper Functions */
  const extractEmotionalTriggers = (text: string): string[] => {
    const patterns = [
      /because of ([\w\s]+)/gi,
      /when ([\w\s]+)/gi,
      /after ([\w\s]+)/gi,
      /due to ([\w\s]+)/gi,
    ];
    const triggers: string[] = [];
    patterns.forEach((p) => {
      const matches = text.match(p);
      if (matches) triggers.push(...matches.map((m) => m.trim()));
    });
    return triggers.slice(0, 3);
  };

  const calculateEmotionalTrend = (states: any[]): "increasing" | "decreasing" | "stable" => {
    if (states.length < 3) return "stable";
    const third = Math.floor(states.length / 3);
    const recent = states.slice(0, third);
    const older = states.slice(-third);
    const avgRecent = recent.reduce((s, v) => s + (v.intensity || 0), 0) / recent.length;
    const avgOlder = older.reduce((s, v) => s + (v.intensity || 0), 0) / older.length;
    const diff = avgRecent - avgOlder;
    if (diff > 0.1) return "increasing";
    if (diff < -0.1) return "decreasing";
    return "stable";
  };

  const generateInsightForEmotion = (
    pattern: EmotionalPattern,
    current: EmotionalState
  ): EmotionalInsight | null => {
    const { emotion, frequency, trend } = pattern;
    if (frequency < 3) return null;

    let insight = `You've experienced ${emotion} ${frequency} times.`;
    let recommendation = "Be aware of your emotional patterns.";
    if (emotion === "anxious")
      recommendation =
        "Practice breathing techniques and mindfulness when anxiety arises.";
    if (emotion === "happy")
      recommendation = "Identify what triggers your happiness to replicate it.";
    if (emotion === "frustrated")
      recommendation =
        "Break tasks into smaller steps and take breaks to reduce frustration.";

    return {
      insight: `${insight} Trend: ${trend}.`,
      confidence: Math.min(frequency / 10, 1.0),
      recommendation,
      emotional_state: current,
    };
  };

  const generateOverallEmotionalInsight = (
    patterns: EmotionalPattern[],
    current: EmotionalState
  ): EmotionalInsight | null => {
    if (!patterns.length) return null;
    const total = patterns.reduce((s, p) => s + p.frequency, 0);
    const positive = patterns
      .filter((p) => ["happy", "confident", "excited"].includes(p.emotion))
      .reduce((s, p) => s + p.frequency, 0);
    const ratio = positive / total;
    return {
      insight: `Your emotional balance is ${(ratio * 100).toFixed(0)}% positive.`,
      confidence: 0.8,
      recommendation:
        ratio > 0.6
          ? "You maintain a healthy balance. Keep it up!"
          : "Focus on activities that increase joy and satisfaction.",
      emotional_state: current,
    };
  };

  return {
    isLoading,
    analyzeEmotionalState,
    trackEmotionalState,
    getEmotionalPatterns,
    generateEmotionalInsights,
  };
};
