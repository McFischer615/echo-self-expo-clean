import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card, Button } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
}

const DeveloperPortalScreen: React.FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("developer_api_keys").select("*");
      if (error) {
        console.error("Error fetching API keys:", error);
        return;
      }
      setKeys(data as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyKey = async (key: string) => {
    await Clipboard.setStringAsync(key);
    Alert.alert("Copied", "API Key copied to clipboard.");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <Text style={styles.loadingText}>Loading Developer Portal...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Developer Portal</Text>
      <Button title="Refresh Keys" onPress={fetchApiKeys} style={{ marginBottom: echoselfTheme.spacing.md }} />

      <FlatList
        data={keys}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.keyCard}>
            <Text style={styles.keyName}>{item.name}</Text>
            <View style={styles.keyRow}>
              <Text style={styles.keyText}>{item.key.slice(0, 15)}...</Text>
              <TouchableOpacity onPress={() => copyKey(item.key)}>
                <Ionicons name="copy-outline" size={18} color={echoselfTheme.colors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.createdAt}>
              Created: {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </Card>
        )}
      />
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
  keyCard: {
    marginBottom: echoselfTheme.spacing.sm,
    padding: echoselfTheme.spacing.sm,
  },
  keyName: { fontSize: 14, fontWeight: "600", color: echoselfTheme.colors.text, marginBottom: 4 },
  keyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  keyText: { fontSize: 12, color: echoselfTheme.colors.textSecondary },
  createdAt: { fontSize: 10, color: echoselfTheme.colors.textSecondary },
});

export default DeveloperPortalScreen;
