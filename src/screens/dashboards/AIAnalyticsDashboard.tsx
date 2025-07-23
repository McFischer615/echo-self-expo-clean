import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { BarChart, PieChart } from "react-native-svg-charts";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import styled from "styled-components/native";

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
    svg: {
      fill: [
        echoselfTheme.colors.primary,
        "#06B6D4",
        "#10B981",
        "#F59E0B",
        "#EF4444",
      ][index % 5],
    },
  }));

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <LoadingText>Loading Analytics...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>AI Analytics Dashboard</Header>

      {/* ✅ Summary */}
      <SummaryRow>
        <Card style={{ width: "30%", alignItems: "center" }}>
          <CardTitle>Total Requests</CardTitle>
          <CardValue>{totalRequests}</CardValue>
        </Card>
        <Card style={{ width: "30%", alignItems: "center" }}>
          <CardTitle>Total Tokens</CardTitle>
          <CardValue>{totalTokens}</CardValue>
        </Card>
        <Card style={{ width: "30%", alignItems: "center" }}>
          <CardTitle>Total Cost</CardTitle>
          <CardValue>${totalCost}</CardValue>
        </Card>
      </SummaryRow>

      {/* ✅ Bar Chart */}
      <Card style={{ marginBottom: echoselfTheme.spacing.md }}>
        <ChartTitle>Requests by Model</ChartTitle>
        <BarChart
          style={{ height: 200 }}
          data={barData}
          svg={{ fill: echoselfTheme.colors.primary }}
          contentInset={{ top: 20, bottom: 20 }}
        />
      </Card>

      {/* ✅ Pie Chart */}
      <Card style={{ marginBottom: echoselfTheme.spacing.md }}>
        <ChartTitle>Request Distribution</ChartTitle>
        <PieChart style={{ height: 200 }} data={pieData} />
      </Card>

      {/* ✅ Detailed List */}
      <ChartTitle>Detailed Analytics</ChartTitle>
      <FlatList
        data={analytics}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: echoselfTheme.spacing.sm }}>
            <ListText>
              {item.provider_name} - {item.model_name}
            </ListText>
            <ListSubText>
              {item.total_requests} req | {item.avg_response_time}ms |{" "}
              {item.success_rate}% success | ${item.total_cost.toFixed(4)}
            </ListSubText>
          </Card>
        )}
      />
    </Container>
  );
};

export default AIAnalyticsDashboard;

//
// ✅ Styled Components
//
const Container = styled(ScrollView)`
  flex: 1;
  padding: ${echoselfTheme.spacing.md}px;
  background-color: ${echoselfTheme.colors.surface};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  margin-top: 10px;
  color: ${echoselfTheme.colors.primary};
`;

const Header = styled.Text`
  font-size: ${echoselfTheme.typography.heading.fontSize}px;
  font-weight: bold;
  color: ${echoselfTheme.colors.primary};
  margin-bottom: 12px;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${echoselfTheme.spacing.md}px;
`;

const CardTitle = styled.Text`
  font-size: 12px;
  color: ${echoselfTheme.colors.textSecondary};
`;

const CardValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${echoselfTheme.colors.text};
`;

const ChartTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${echoselfTheme.colors.text};
`;

const ListText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${echoselfTheme.colors.text};
`;

const ListSubText = styled.Text`
  font-size: 12px;
  color: ${echoselfTheme.colors.textSecondary};
  margin-top: 2px;
`;
