import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { BarChart, PieChart } from "react-native-svg-charts";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import styled from "styled-components/native";

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
      <LoadingContainer>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <LoadingText>Loading Analytics...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>Analytics Dashboard</Header>

      <Card style={{ alignItems: "center", marginBottom: echoselfTheme.spacing.md }}>
        <CardTitle>Total Metrics</CardTitle>
        <CardValue>{total}</CardValue>
      </Card>

      <Card style={{ marginBottom: echoselfTheme.spacing.md }}>
        <ChartTitle>Metrics Overview</ChartTitle>
        <BarChart
          style={{ height: 200 }}
          data={barData}
          svg={{ fill: echoselfTheme.colors.primary }}
          contentInset={{ top: 20, bottom: 20 }}
        />
      </Card>

      <Card style={{ marginBottom: echoselfTheme.spacing.md }}>
        <ChartTitle>Metrics Distribution</ChartTitle>
        <PieChart style={{ height: 200 }} data={pieData} />
      </Card>

      <ChartTitle>Detailed Metrics</ChartTitle>
      <FlatList
        data={analytics}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: echoselfTheme.spacing.sm }}>
            <ListText>{item.metric}</ListText>
            <ListSubText>{item.value}</ListSubText>
          </Card>
        )}
      />
    </Container>
  );
};

export default AnalyticsDashboard;

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
