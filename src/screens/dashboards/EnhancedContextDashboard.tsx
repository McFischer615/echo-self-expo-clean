import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, Dimensions } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import styled from "styled-components/native";
import { BarChart } from "react-native-chart-kit";

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
      const { data, error } = await supabase
        .from("enhanced_context_metrics")
        .select("*");
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
      <LoadingContainer>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <LoadingText>Loading Enhanced Context Metrics...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>Enhanced Context Dashboard</Header>

      <Card style={{ marginBottom: echoselfTheme.spacing.md }}>
        <ChartTitle>Relevance Scores</ChartTitle>
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

      <SubHeader>Detailed Contexts</SubHeader>
      <FlatList
        data={contextData}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: echoselfTheme.spacing.sm }}>
            <ListText>{item.context_key}</ListText>
            <ListSubText>
              Relevance: {item.relevance_score}% | Usage Count: {item.usage_count}
            </ListSubText>
          </Card>
        )}
      />
    </Container>
  );
};

export default EnhancedContextDashboard;

//
// ✅ Styled Components
//
const Container = styled.ScrollView`
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

const SubHeader = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${echoselfTheme.colors.text};
  margin-top: ${echoselfTheme.spacing.md}px;
  margin-bottom: ${echoselfTheme.spacing.sm}px;
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
