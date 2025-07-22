import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEnhancedDecisionPatterns } from "../hooks/useEnhancedDecisionPatterns";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card, Button } from "@/components/ui";

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <Text style={styles.loadingText}>Loading decision patterns...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Enhanced Decision Patterns</Text>
        <Button title="Refresh" onPress={loadAnalytics} style={{ width: 100 }} />
      </View>

      {/* Metrics */}
      <View style={styles.metricsRow}>
        <Card style={styles.metricCard}>
          <Text style={styles.metricLabel}>Success Rate</Text>
          <Text style={styles.metricValue}>
            {((analytics?.successRate || 0) * 100).toFixed(1)}%
          </Text>
        </Card>
        <Card style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total Decisions</Text>
          <Text style={styles.metricValue}>{analytics?.totalDecisions || 0}</Text>
        </Card>
        <Card style={styles.metricCard}>
          <Text style={styles.metricLabel}>This Week</Text>
          <Text style={styles.metricValue}>{analytics?.decisionVelocity || 0}</Text>
        </Card>
      </View>

      {/* Predictor */}
      <Card style={styles.predictorCard}>
        <Text style={styles.cardTitle}>Decision Outcome Predictor</Text>
        <TextInput
          style={styles.input}
          placeholder="Decision Context..."
          value={testContext}
          onChangeText={setTestContext}
          multiline
        />
        <TextInput
          style={styles.input}
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
          <View style={styles.predictionBox}>
            <Text style={[styles.predictedOutcome, { color: getOutcomeColor(prediction.predictedOutcome) }]}>
              {prediction.predictedOutcome}
            </Text>
            <Text style={styles.predictionReason}>{prediction.reasoning}</Text>
          </View>
        )}
      </Card>

      {/* Trends */}
      {analytics?.recentTrends?.length > 0 && (
        <Card style={styles.chartCard}>
          <Text style={styles.cardTitle}>Decision Success Trends</Text>
          <LineChart
            data={{
              labels: analytics.recentTrends.map((t: any) =>
                new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              ),
              datasets: [{ data: analytics.recentTrends.map((t: any) => t.successRate * 100) }],
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: echoselfTheme.colors.surface, padding: echoselfTheme.spacing.md },
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { color: echoselfTheme.colors.textSecondary, marginTop: 8 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: echoselfTheme.spacing.md },
  headerTitle: { fontSize: echoselfTheme.typography.heading.fontSize, fontWeight: "bold", color: echoselfTheme.colors.primary },
  metricsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: echoselfTheme.spacing.md },
  metricCard: { width: "30%", alignItems: "center", padding: echoselfTheme.spacing.sm },
  metricLabel: { fontSize: 12, color: echoselfTheme.colors.textSecondary },
  metricValue: { fontSize: 16, fontWeight: "bold", color: echoselfTheme.colors.text },
  predictorCard: { marginBottom: echoselfTheme.spacing.md },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 6, color: echoselfTheme.colors.text },
  input: {
    borderWidth: 1,
    borderColor: echoselfTheme.colors.border,
    borderRadius: echoselfTheme.radius.sm,
    padding: 8,
    marginBottom: 6,
    backgroundColor: echoselfTheme.colors.background,
    color: echoselfTheme.colors.text,
  },
  predictionBox: {
    backgroundColor: echoselfTheme.colors.background,
    padding: 8,
    borderRadius: echoselfTheme.radius.sm,
    marginTop: 6,
    borderWidth: 1,
    borderColor: echoselfTheme.colors.border,
  },
  predictedOutcome: { fontWeight: "600", fontSize: 14 },
  predictionReason: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 4 },
  chartCard: { marginBottom: echoselfTheme.spacing.md },
});

export default EnhancedDecisionPatternsDashboard;
