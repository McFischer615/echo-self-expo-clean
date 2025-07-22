import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

interface PatternMetric {
  pattern_name: string;
  occurrence_count: number;
  accuracy_rate: number;
}

const DecisionPatternsDashboard: React.FC = () => {
  const [patterns, setPatterns] = useState<PatternMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatterns();
  }, []);

  const fetchPatterns = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("decision_patterns").select("*");
      if (error) {
        console.error("Error fetching decision patterns:", error);
        return;
      }
      setPatterns(data as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: patterns.map((p) => p.pattern_name),
    datasets: [
      {
        data: patterns.map((p) => p.accuracy_rate),
      },
    ],
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <Text style={styles.loadingText}>Loading Decision Patterns...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Decision Patterns Dashboard</Text>

      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Accuracy Rates by Pattern</Text>
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: echoselfTheme.colors.surface,
            backgroundGradientFrom: echoselfTheme.colors.surface,
            backgroundGradientTo: echoselfTheme.colors.surface,
            decimalPlaces: 1,
            color: () => echoselfTheme.colors.primary,
            labelColor: () => echoselfTheme.colors.textSecondary,
          }}
          style={{ borderRadius: echoselfTheme.radius.md }}
        />
      </Card>

      <Text style={styles.chartTitle}>Detailed Patterns</Text>
      <FlatList
        data={patterns}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={styles.listRow}>
            <Text style={styles.listText}>{item.pattern_name}</Text>
            <Text style={styles.listSubText}>
              Occurrences: {item.occurrence_count} | Accuracy: {item.accuracy_rate}%
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
  chartCard: { marginBottom: echoselfTheme.spacing.md },
  chartTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: echoselfTheme.colors.text },
  listRow: { marginBottom: echoselfTheme.spacing.sm },
  listText: { fontSize: 14, fontWeight: "600", color: echoselfTheme.colors.text },
  listSubText: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 2 },
});

export default DecisionPatternsDashboard;
