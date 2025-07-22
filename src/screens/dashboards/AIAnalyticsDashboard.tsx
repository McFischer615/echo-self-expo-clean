import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { BarChart, PieChart } from "react-native-svg-charts";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";

interface UsageAnalytics {
  provider_name: string;
  model_name: string;
  total_requests: number;
  total_tokens: number;
  avg_response_time: number;
  success_rate: number;
  total_cost: number;
}

const AIAnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<UsageAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("ai_usage_analytics").select("*");
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

  const totalRequests = analytics.reduce((sum, i) => sum + i.total_requests, 0);
  const totalTokens = analytics.reduce((sum, i) => sum + i.total_tokens, 0);
  const totalCost = analytics.reduce((sum, i) => sum + i.total_cost, 0).toFixed(4);

  const barData = analytics.map((a) => a.total_requests);
  const pieData = analytics.map((item, index) => ({
    key: index,
    value: item.total_requests,
    svg: { fill: [echoselfTheme.colors.primary, "#06B6D4", "#10B981", "#F59E0B", "#EF4444"][index % 5] },
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
      <Text style={styles.header}>AI Analytics Dashboard</Text>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <Card style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Total Requests</Text>
          <Text style={styles.cardValue}>{totalRequests}</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Total Tokens</Text>
          <Text style={styles.cardValue}>{totalTokens}</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Total Cost</Text>
          <Text style={styles.cardValue}>${totalCost}</Text>
        </Card>
      </View>

      {/* Bar Chart */}
      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Requests by Model</Text>
        <BarChart style={{ height: 200 }} data={barData} svg={{ fill: echoselfTheme.colors.primary }} contentInset={{ top: 20, bottom: 20 }} />
      </Card>

      {/* Pie Chart */}
      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Request Distribution</Text>
        <PieChart style={{ height: 200 }} data={pieData} />
      </Card>

      {/* Detailed List */}
      <Text style={styles.chartTitle}>Detailed Analytics</Text>
      <FlatList
        data={analytics}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={styles.listRow}>
            <Text style={styles.listText}>{item.provider_name} - {item.model_name}</Text>
            <Text style={styles.listSubText}>
              {item.total_requests} req | {item.avg_response_time}ms | {item.success_rate}% success | ${item.total_cost.toFixed(4)}
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
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: echoselfTheme.spacing.md },
  summaryCard: { width: "30%", alignItems: "center" },
  cardTitle: { fontSize: 12, color: echoselfTheme.colors.textSecondary },
  cardValue: { fontSize: 16, fontWeight: "bold", color: echoselfTheme.colors.text },
  chartCard: { marginBottom: echoselfTheme.spacing.md },
  chartTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: echoselfTheme.colors.text },
  listRow: { marginBottom: echoselfTheme.spacing.sm },
  listText: { fontSize: 14, fontWeight: "600", color: echoselfTheme.colors.text },
  listSubText: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 2 },
});

export default AIAnalyticsDashboard;
