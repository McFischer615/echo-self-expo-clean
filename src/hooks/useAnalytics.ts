import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client"; // ✅ Ensure client uses AsyncStorage for RN

interface AnalyticsData {
  totalInteractions: number;
  averageResponseQuality: number;
  topTopics: string[];
  conversationTrends: { date: string; count: number }[];
  echoPerformance: { echoId: string; accuracy: number; interactions: number }[];
}

interface AnalyticsFilter {
  dateRange: "7d" | "30d" | "90d" | "all";
  echoId?: string;
}

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<AnalyticsFilter>({ dateRange: "30d" });

  /** ✅ Tracks interaction data in Supabase */
  const trackInteraction = async (
    echoId: string,
    interactionType: string,
    sessionId: string,
    responseQuality?: number,
    conversationLength?: number,
    topics?: string[],
    metadata?: Record<string, any>
  ) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { error } = await supabase.from("echo_analytics").insert({
        user_id: user.id,
        echo_id: echoId,
        interaction_type: interactionType,
        session_id: sessionId,
        response_quality_score: responseQuality ?? null,
        conversation_length: conversationLength ?? null,
        topics: topics || [],
        metadata: metadata || {},
      });

      if (error) console.error("Error tracking interaction:", error.message);
    } catch (err) {
      console.error("Error tracking interaction:", JSON.stringify(err));
    }
  };

  /** ✅ Fetches analytics with filters */
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setLoading(false);
        return;
      }

      let query = supabase.from("echo_analytics").select("*").eq("user_id", user.id);

      // ✅ Date range filter
      if (filter.dateRange !== "all") {
        const days = filter.dateRange === "7d" ? 7 : filter.dateRange === "30d" ? 30 : 90;
        const sinceDate = new Date();
        sinceDate.setDate(sinceDate.getDate() - days);
        query = query.gte("created_at", sinceDate.toISOString());
      }

      // ✅ Echo-specific filter
      if (filter.echoId) {
        query = query.eq("echo_id", filter.echoId);
      }

      const { data: interactions, error } = await query;
      if (error || !interactions) {
        console.error("Error fetching analytics:", error?.message);
        return;
      }

      // ✅ Total interactions
      const totalInteractions = interactions.length;

      // ✅ Average response quality
      const qualityInteractions = interactions.filter((i) => i.response_quality_score);
      const averageResponseQuality =
        qualityInteractions.reduce((acc, i) => acc + (i.response_quality_score || 0), 0) /
        (qualityInteractions.length || 1);

      // ✅ Top topics
      const topicCounts: Record<string, number> = {};
      interactions.forEach((i) => {
        if (Array.isArray(i.topics)) {
          i.topics.forEach((topic: string) => {
            topicCounts[topic] = (topicCounts[topic] || 0) + 1;
          });
        }
      });
      const topTopics = Object.entries(topicCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([topic]) => topic);

      // ✅ Conversation trends by date
      const trendData: Record<string, number> = {};
      interactions.forEach((i) => {
        const date = new Date(i.created_at).toISOString().split("T")[0];
        trendData[date] = (trendData[date] || 0) + 1;
      });
      const conversationTrends = Object.entries(trendData)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, count]) => ({ date, count }));

      // ✅ Echo performance metrics
      const echoPerformanceMap: Record<
        string,
        { totalInteractions: number; totalQuality: number; qualityCount: number }
      > = {};
      interactions.forEach((i) => {
        if (!i.echo_id) return;
        if (!echoPerformanceMap[i.echo_id]) {
          echoPerformanceMap[i.echo_id] = { totalInteractions: 0, totalQuality: 0, qualityCount: 0 };
        }
        echoPerformanceMap[i.echo_id].totalInteractions++;
        if (i.response_quality_score) {
          echoPerformanceMap[i.echo_id].totalQuality += i.response_quality_score;
          echoPerformanceMap[i.echo_id].qualityCount++;
        }
      });

      const echoPerformance = Object.entries(echoPerformanceMap).map(([echoId, data]) => ({
        echoId,
        accuracy: data.qualityCount > 0 ? data.totalQuality / data.qualityCount : 0,
        interactions: data.totalInteractions,
      }));

      // ✅ Save to state
      setAnalyticsData({
        totalInteractions,
        averageResponseQuality,
        topTopics,
        conversationTrends,
        echoPerformance,
      });
    } catch (err) {
      console.error("Error fetching analytics:", JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Update filters and re-fetch */
  const updateFilter = (newFilter: Partial<AnalyticsFilter>) =>
    setFilter((prev) => ({ ...prev, ...newFilter }));

  useEffect(() => {
    fetchAnalytics();
  }, [filter]);

  return { analyticsData, loading, filter, trackInteraction, fetchAnalytics, updateFilter };
};
