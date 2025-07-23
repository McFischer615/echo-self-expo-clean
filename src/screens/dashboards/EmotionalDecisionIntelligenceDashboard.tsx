import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import { LineChart } from "react-native-chart-kit";
import styled from "styled-components/native";

interface EDIRecord {
  factor: string;
  score: number;
  trend: number[];
}

const EmotionalDecisionIntelligenceDashboard: React.FC = () => {
  const [records, setRecords] = useState<EDIRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEDIRecords();
  }, []);

  const fetchEDIRecords = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("emotional_decision_intelligence")
        .select("*");
      if (error) {
        console.error("Error fetching EDI records:", error);
        return;
      }
      setRecords(data as any);
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
          Loading Emotional Decision Intelligence...
        </LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>Emotional Decision Intelligence</Header>

      {records.map((record, index) => (
        <Card key={index} style={{ marginBottom: echoselfTheme.spacing.md }}>
          <RecordTitle>{record.factor}</RecordTitle>
          <RecordScore>Current Score: {record.score}</RecordScore>
          {record.trend && record.trend.length > 1 && (
            <LineChart
              data={{
                labels: record.trend.map((_, i) => `T${i + 1}`),
                datasets: [{ data: record.trend }],
              }}
              width={Dimensions.get("window").width - 40}
              height={180}
              chartConfig={{
                backgroundColor: echoselfTheme.colors.surface,
                backgroundGradientFrom: echoselfTheme.colors.surface,
                backgroundGradientTo: echoselfTheme.colors.surface,
                decimalPlaces: 1,
                color: () => echoselfTheme.colors.primary,
                labelColor: () => echoselfTheme.colors.textSecondary,
              }}
              style={{
                borderRadius: echoselfTheme.radius.md,
                marginTop: echoselfTheme.spacing.sm,
              }}
            />
          )}
        </Card>
      ))}

      <SubHeader>Detailed Records</SubHeader>
      <FlatList
        data={records}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: echoselfTheme.spacing.sm }}>
            <ListText>{item.factor}</ListText>
            <ListSubText>Score: {item.score}</ListSubText>
          </Card>
        )}
      />
    </Container>
  );
};

export default EmotionalDecisionIntelligenceDashboard;

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

const RecordTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${echoselfTheme.colors.text};
`;

const RecordScore = styled.Text`
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
