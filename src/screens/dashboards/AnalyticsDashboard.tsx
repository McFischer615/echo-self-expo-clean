import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import { BarChart, PieChart } from "react-native-svg-charts";

interface AnalyticsItem {
  metric: string;
  value: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("analytics_metrics").select("*");
      if (error) {
        console.error("Error fetching analytics:", error);
        return;
      }
      setAnalytics(data as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const total = analytics.reduce((sum, i) => sum + i.value, 0);

  const barData = analytics.map((a) => a.value);
  const pieData = analytics.map((item, index) => ({
    key: index,
    value: item.value,
    svg: {
      fill: [
        echoselfTheme.colors.primary,
        echoselfTheme.colors.secondary,
        echoselfTheme.colors.success,
        echoselfTheme.colors.warning,
        echoselfTheme.colors.error,
      ][index % 5],
    },
  }));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <Text style={styles.loadingText}>Loading Analytics...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Analytics Dashboard</Text>

      <Card style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Total Metrics</Text>
        <Text style={styles.cardValue}>{total}</Text>
      </Card>

      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Metrics Overview</Text>
        <BarChart style={{ height: 200 }} data={barData} svg={{ fill: echoselfTheme.colors.primary }} contentInset={{ top: 20, bottom: 20 }} />
      </Card>

      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Metrics Distribution</Text>
        <PieChart style={{ height: 200 }} data={pieData} />
      </Card>

      <Text style={styles.chartTitle}>Detailed Metrics</Text>
      <FlatList
        data={analytics}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={styles.listRow}>
            <Text style={styles.listText}>{item.metric}</Text>
            <Text style={styles.listSubText}>{item.value}</Text>
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
  summaryCard: { alignItems: "center", marginBottom: echoselfTheme.spacing.md },
  cardTitle: { fontSize: 12, color: echoselfTheme.colors.textSecondary },
  cardValue: { fontSize: 16, fontWeight: "bold", color: echoselfTheme.colors.text },
  chartCard: { marginBottom: echoselfTheme.spacing.md },
  chartTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: echoselfTheme.colors.text },
  listRow: { marginBottom: echoselfTheme.spacing.sm },
  listText: { fontSize: 14, fontWeight: "600", color: echoselfTheme.colors.text },
  listSubText: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 2 },
});

export default AnalyticsDashboard;
