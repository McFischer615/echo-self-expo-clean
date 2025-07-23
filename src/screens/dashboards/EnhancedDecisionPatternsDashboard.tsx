import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEnhancedDecisionPatterns } from "../hooks/useEnhancedDecisionPatterns";
import { LineChart } from "react-native-chart-kit";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card, Button } from "@/components/ui";
import styled from "styled-components/native";

const EnhancedDecisionPatternsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [testContext, setTestContext] = useState("");
  const [testChoice, setTestChoice] = useState("");
  const [loading, setLoading] = useState(true);

  const { getDecisionAnalytics, predictDecisionOutcome, isLoading: hookLoading } =
    useEnhancedDecisionPatterns();

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getDecisionAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Error loading decision analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePredictOutcome = async () => {
    if (!testContext || !testChoice) return;
    try {
      const result = await predictDecisionOutcome(testContext, testChoice);
      setPrediction(result);
    } catch (error) {
      console.error("Error predicting outcome:", error);
    }
  };

  const getOutcomeColor = (outcome: string) => {
    if (outcome.includes("highly likely positive")) return echoselfTheme.colors.success;
    if (outcome.includes("likely positive")) return echoselfTheme.colors.secondary;
    if (outcome.includes("mixed")) return echoselfTheme.colors.warning;
    if (outcome.includes("caution")) return echoselfTheme.colors.error;
    return echoselfTheme.colors.textSecondary;
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <LoadingText>Loading decision patterns...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <HeaderRow>
        <HeaderTitle>Enhanced Decision Patterns</HeaderTitle>
        <Button title="Refresh" onPress={loadAnalytics} style={{ width: 100 }} />
      </HeaderRow>

      {/* Metrics */}
      <MetricsRow>
        <Card style={{ width: "30%", alignItems: "center", padding: echoselfTheme.spacing.sm }}>
          <MetricLabel>Success Rate</MetricLabel>
          <MetricValue>{((analytics?.successRate || 0) * 100).toFixed(1)}%</MetricValue>
        </Card>
        <Card style={{ width: "30%", alignItems: "center", padding: echoselfTheme.spacing.sm }}>
          <MetricLabel>Total Decisions</MetricLabel>
          <MetricValue>{analytics?.totalDecisions || 0}</MetricValue>
        </Card>
        <Card style={{ width: "30%", alignItems: "center", padding: echoselfTheme.spacing.sm }}>
          <MetricLabel>This Week</MetricLabel>
          <MetricValue>{analytics?.decisionVelocity || 0}</MetricValue>
        </Card>
      </MetricsRow>

      {/* Predictor */}
      <Card style={{ marginBottom: echoselfTheme.spacing.md }}>
        <CardTitle>Decision Outcome Predictor</CardTitle>
        <StyledInput
          placeholder="Decision Context..."
          value={testContext}
          onChangeText={setTestContext}
          multiline
        />
        <StyledInput
          placeholder="Proposed Choice..."
          value={testChoice}
          onChangeText={setTestChoice}
        />
        <Button
          title="Predict Outcome"
          onPress={handlePredictOutcome}
          disabled={!testContext || !testChoice || hookLoading}
          style={{ marginTop: echoselfTheme.spacing.sm }}
        />
        {prediction && (
          <PredictionBox>
            <PredictedOutcome color={getOutcomeColor(prediction.predictedOutcome)}>
              {prediction.predictedOutcome}
            </PredictedOutcome>
            <PredictionReason>{prediction.reasoning}</PredictionReason>
          </PredictionBox>
        )}
      </Card>

      {/* Trends */}
      {analytics?.recentTrends?.length > 0 && (
        <Card style={{ marginBottom: echoselfTheme.spacing.md }}>
          <CardTitle>Decision Success Trends</CardTitle>
          <LineChart
            data={{
              labels: analytics.recentTrends.map((t: any) =>
                new Date(t.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              ),
              datasets: [
                { data: analytics.recentTrends.map((t: any) => t.successRate * 100) },
              ],
            }}
            width={Dimensions.get("window").width - 40}
            height={220}
            yAxisSuffix="%"
            chartConfig={{
              backgroundGradientFrom: echoselfTheme.colors.surface,
              backgroundGradientTo: echoselfTheme.colors.surface,
              color: () => echoselfTheme.colors.primary,
              labelColor: () => echoselfTheme.colors.textSecondary,
            }}
            style={{ borderRadius: echoselfTheme.radius.md }}
          />
        </Card>
      )}
    </Container>
  );
};

export default EnhancedDecisionPatternsDashboard;

//
// ✅ Styled Components
//
const Container = styled.ScrollView`
  flex: 1;
  background-color: ${echoselfTheme.colors.surface};
  padding: ${echoselfTheme.spacing.md}px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.Text`
  color: ${echoselfTheme.colors.textSecondary};
  margin-top: 8px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${echoselfTheme.spacing.md}px;
`;

const HeaderTitle = styled.Text`
  font-size: ${echoselfTheme.typography.heading.fontSize}px;
  font-weight: bold;
  color: ${echoselfTheme.colors.primary};
`;

const MetricsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${echoselfTheme.spacing.md}px;
`;

const MetricLabel = styled.Text`
  font-size: 12px;
  color: ${echoselfTheme.colors.textSecondary};
`;

const MetricValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${echoselfTheme.colors.text};
`;

const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${echoselfTheme.colors.text};
`;

const StyledInput = styled(TextInput)`
  border-width: 1px;
  border-color: ${echoselfTheme.colors.border};
  border-radius: ${echoselfTheme.radius.sm}px;
  padding: 8px;
  margin-bottom: 6px;
  background-color: ${echoselfTheme.colors.background};
  color: ${echoselfTheme.colors.text};
`;

const PredictionBox = styled.View`
  background-color: ${echoselfTheme.colors.background};
  padding: 8px;
  border-radius: ${echoselfTheme.radius.sm}px;
  margin-top: 6px;
  border-width: 1px;
  border-color: ${echoselfTheme.colors.border};
`;

const PredictedOutcome = styled.Text<{ color: string }>`
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.color};
`;

const PredictionReason = styled.Text`
  font-size: 12px;
  color: ${echoselfTheme.colors.textSecondary};
  margin-top: 4px;
`;
