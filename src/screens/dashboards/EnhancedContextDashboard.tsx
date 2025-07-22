import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

interface ContextMetric {
  context_key: string;
  relevance_score: number; // 0-100
  usage_count: number;
}

const EnhancedContextDashboard: React.FC = () => {
  const [contextData, setContextData] = useState<ContextMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContextMetrics();
  }, []);

  const fetchContextMetrics = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("enhanced_context_metrics").select("*");
      if (error) {
        console.error("Error fetching context metrics:", error);
        return;
      }
      setContextData(data as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: contextData.map((c) => c.context_key.slice(0, 5)), // Shortened for display
    datasets: [
      {
        data: contextData.map((c) => c.relevance_score),
      },
    ],
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <Text style={styles.loadingText}>Loading Enhanced Context Metrics...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Enhanced Context Dashboard</Text>

      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Relevance Scores</Text>
        <BarChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: echoselfTheme.colors.surface,
            backgroundGradientFrom: echoselfTheme.colors.surface,
            backgroundGradientTo: echoselfTheme.colors.surface,
            decimalPlaces: 0,
            color: () => echoselfTheme.colors.primary,
            labelColor: () => echoselfTheme.colors.textSecondary,
          }}
          style={{ borderRadius: echoselfTheme.radius.md }}
        />
      </Card>

      <Text style={styles.subHeader}>Detailed Contexts</Text>
      <FlatList
        data={contextData}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={styles.listRow}>
            <Text style={styles.listText}>{item.context_key}</Text>
            <Text style={styles.listSubText}>
              Relevance: {item.relevance_score}% | Usage Count: {item.usage_count}
            </Text>
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
  chartCard: { marginBottom: echoselfTheme.spacing.md },
  chartTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: echoselfTheme.colors.text },
  listRow: { marginBottom: echoselfTheme.spacing.sm },
  listText: { fontSize: 14, fontWeight: "600", color: echoselfTheme.colors.text },
  listSubText: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 2 },
});

export default EnhancedContextDashboard;
