import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";

interface DashboardMetric {
  id: string;
  title: string;
  value: number | string;
  icon: string;
}

const DashboardScreen: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("dashboard_metrics").select("*");
      if (error) {
        console.error("Error fetching dashboard metrics:", error);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <Text style={styles.loadingText}>Loading Dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <FlatList
        data={metrics}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Card style={styles.metricCard}>
            <View style={styles.metricContent}>
              <Ionicons name={item.icon as any} size={28} color={echoselfTheme.colors.primary} />
              <Text style={styles.metricTitle}>{item.title}</Text>
              <Text style={styles.metricValue}>{item.value}</Text>
            </View>
          </Card>
        )}
      />

      <View style={styles.navSection}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chatbubbles-outline" size={20} color={echoselfTheme.colors.primary} />
          <Text style={styles.navText}>Chat with Echo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="create-outline" size={20} color={echoselfTheme.colors.primary} />
          <Text style={styles.navText}>Create Echo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: echoselfTheme.colors.surface, padding: echoselfTheme.spacing.md },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 8, color: echoselfTheme.colors.textSecondary },
  header: {
    fontSize: echoselfTheme.typography.heading.fontSize,
    fontWeight: "bold",
    color: echoselfTheme.colors.primary,
    marginBottom: echoselfTheme.spacing.md,
  },
  row: { justifyContent: "space-between" },
  metricCard: {
    width: "48%",
    padding: echoselfTheme.spacing.sm,
    marginBottom: echoselfTheme.spacing.sm,
  },
  metricContent: { alignItems: "center" },
  metricTitle: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 4 },
  metricValue: { fontSize: 16, fontWeight: "600", color: echoselfTheme.colors.text },
  navSection: { marginTop: echoselfTheme.spacing.lg },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: echoselfTheme.spacing.sm,
  },
  navText: {
    fontSize: 14,
    color: echoselfTheme.colors.text,
    marginLeft: echoselfTheme.spacing.xs,
  },
});

export default DashboardScreen;
