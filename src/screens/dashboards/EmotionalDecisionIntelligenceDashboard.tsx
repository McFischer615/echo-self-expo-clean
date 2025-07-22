import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

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
      const { data, error } = await supabase.from("emotional_decision_intelligence").select("*");
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <Text style={styles.loadingText}>Loading Emotional Decision Intelligence...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Emotional Decision Intelligence</Text>

      {records.map((record, index) => (
        <Card key={index} style={styles.recordCard}>
          <Text style={styles.recordTitle}>{record.factor}</Text>
          <Text style={styles.recordScore}>Current Score: {record.score}</Text>
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
              style={{ borderRadius: echoselfTheme.radius.md, marginTop: echoselfTheme.spacing.sm }}
            />
          )}
        </Card>
      ))}

      <Text style={styles.subHeader}>Detailed Records</Text>
      <FlatList
        data={records}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card style={styles.listRow}>
            <Text style={styles.listText}>{item.factor}</Text>
            <Text style={styles.listSubText}>Score: {item.score}</Text>
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
  subHeader: { fontSize: 16, fontWeight: "600", color: echoselfTheme.colors.text, marginTop: echoselfTheme.spacing.md, marginBottom: echoselfTheme.spacing.sm },
  recordCard: { marginBottom: echoselfTheme.spacing.md },
  recordTitle: { fontSize: 14, fontWeight: "600", color: echoselfTheme.colors.text },
  recordScore: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 4 },
  listRow: { marginBottom: echoselfTheme.spacing.sm },
  listText: { fontSize: 14, fontWeight: "600", color: echoselfTheme.colors.text },
  listSubText: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 2 },
});

export default EmotionalDecisionIntelligenceDashboard;
