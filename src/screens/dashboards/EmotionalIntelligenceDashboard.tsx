import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import { Progress } from "@/components/ui";

interface EIMetric {
  category: string;
  score: number; // 0-100
}

const EmotionalIntelligenceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<EIMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("emotional_intelligence_metrics").select("*");
      if (error) {
        console.error("Error fetching EI metrics:", error);
        return;
      }
      setMetrics(data as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <Text style={styles.loadingText}>Loading Emotional Intelligence Metrics...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Emotional Intelligence Dashboard</Text>

      {metrics.map((metric, index) => (
        <Card key={index} style={styles.metricCard}>
          <Text style={styles.metricTitle}>{metric.category}</Text>
          <Progress value={metric.score} />
          <Text style={styles.metricScore}>{metric.score}%</Text>
        </Card>
      ))}

      <Text style={styles.subHeader}>Detailed Metrics</Text>
      <FlatList
        data={metrics}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={styles.listRow}>
            <Text style={styles.listText}>{item.category}</Text>
            <Text style={styles.listSubText}>Score: {item.score}%</Text>
          </Card>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: echoselfTheme.spacing.md, backgroundColor: echoselfTheme.colors.surface },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: echoselfTheme.colors.primary },
  header: { fontSize: echoselfTheme.typography.heading.fontSize, fontWeight: "bold", color: echoselfTheme.colors.primary, marginBottom: 12 },
  subHeader: { fontSize: 16, fontWeight: "600", color: echoselfTheme.colors.text, marginTop: echoselfTheme.spacing.md, marginBottom: echoselfTheme.spacing.sm },
  metricCard: { marginBottom: echoselfTheme.spacing.md },
  metricTitle: { fontSize: 14, fontWeight: "600", color: echoselfTheme.colors.text, marginBottom: 4 },
  metricScore: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 4 },
  listRow: { marginBottom: echoselfTheme.spacing.sm },
  listText: { fontSize: 14, fontWeight: "600", color: echoselfTheme.colors.text },
  listSubText: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 2 },
});

export default EmotionalIntelligenceDashboard;
