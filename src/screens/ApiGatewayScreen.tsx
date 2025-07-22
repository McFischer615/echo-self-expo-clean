import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card, Button } from "@/components/ui";

interface ApiRoute {
  id: string;
  name: string;
  status: string;
  request_count: number;
  latency: number; // in ms
}

const ApiGatewayScreen: React.FC = () => {
  const [routes, setRoutes] = useState<ApiRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("api_gateway_routes").select("*");
      if (error) {
        console.error("Error fetching API routes:", error);
        return;
      }
      setRoutes(data as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => fetchRoutes();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <Text style={styles.loadingText}>Loading API Gateway Data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>API Gateway</Text>
        <Button title="Refresh" onPress={handleRefresh} style={{ width: 100 }} />
      </View>

      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.routeCard}>
            <View style={styles.routeHeader}>
              <Text style={styles.routeName}>{item.name}</Text>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      item.status === "active"
                        ? echoselfTheme.colors.success
                        : echoselfTheme.colors.error,
                  },
                ]}
              />
            </View>
            <Text style={styles.routeDetail}>
              Requests: {item.request_count} | Latency: {item.latency}ms
            </Text>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: echoselfTheme.colors.surface,
    padding: echoselfTheme.spacing.md,
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 8, color: echoselfTheme.colors.textSecondary },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: echoselfTheme.spacing.md,
  },
  header: {
    fontSize: echoselfTheme.typography.heading.fontSize,
    fontWeight: "bold",
    color: echoselfTheme.colors.primary,
  },
  routeCard: {
    marginBottom: echoselfTheme.spacing.sm,
    padding: echoselfTheme.spacing.sm,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  routeName: {
    fontSize: 16,
    fontWeight: "600",
    color: echoselfTheme.colors.text,
  },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  routeDetail: {
    fontSize: 12,
    color: echoselfTheme.colors.textSecondary,
  },
});

export default ApiGatewayScreen;
