import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card, Progress } from "@/components/ui";
import styled from "styled-components/native";

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
      const { data, error } = await supabase
        .from("emotional_intelligence_metrics")
        .select("*");
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
      <LoadingContainer>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <LoadingText>
          Loading Emotional Intelligence Metrics...
        </LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>Emotional Intelligence Dashboard</Header>

      {metrics.map((metric, index) => (
        <Card key={index} style={{ marginBottom: echoselfTheme.spacing.md }}>
          <MetricTitle>{metric.category}</MetricTitle>
          <Progress value={metric.score} />
          <MetricScore>{metric.score}%</MetricScore>
        </Card>
      ))}

      <SubHeader>Detailed Metrics</SubHeader>
      <FlatList
        data={metrics}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: echoselfTheme.spacing.sm }}>
            <ListText>{item.category}</ListText>
            <ListSubText>Score: {item.score}%</ListSubText>
          </Card>
        )}
      />
    </Container>
  );
};

export default EmotionalIntelligenceDashboard;

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

const MetricTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${echoselfTheme.colors.text};
  margin-bottom: 4px;
`;

const MetricScore = styled.Text`
  font-size: 12px;
  color: ${echoselfTheme.colors.textSecondary};
  margin-top: 4px;
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
