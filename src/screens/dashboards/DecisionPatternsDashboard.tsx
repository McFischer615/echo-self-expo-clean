import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, FlatList, Dimensions } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import { LineChart } from "react-native-chart-kit";
import styled from "styled-components/native";

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
      <LoadingContainer>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <LoadingText>Loading Decision Patterns...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>Decision Patterns Dashboard</Header>

      <Card style={{ marginBottom: echoselfTheme.spacing.md }}>
        <ChartTitle>Accuracy Rates by Pattern</ChartTitle>
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

      <ChartTitle>Detailed Patterns</ChartTitle>
      <FlatList
        data={patterns}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: echoselfTheme.spacing.sm }}>
            <ListText>{item.pattern_name}</ListText>
            <ListSubText>
              Occurrences: {item.occurrence_count} | Accuracy: {item.accuracy_rate}%
            </ListSubText>
          </Card>
        )}
      />
    </Container>
  );
};

export default DecisionPatternsDashboard;

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
