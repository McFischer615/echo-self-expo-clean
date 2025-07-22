import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card, Button } from "@/components/ui";

interface EchoProfile {
  id: string;
  name: string;
  status: string;
  last_sync: string;
}

const EchoManager: React.FC = () => {
  const [profiles, setProfiles] = useState<EchoProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("echo_profiles").select("*");
      if (error) {
        console.error("Error fetching echo profiles:", error);
        return;
      }
      setProfiles(data as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const syncProfile = async (id: string) => {
    try {
      await supabase.from("echo_profiles").update({ last_sync: new Date().toISOString() }).eq("id", id);
      fetchProfiles();
    } catch (error) {
      console.error("Error syncing profile:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <Text style={styles.loadingText}>Loading Echo Profiles...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Echo Manager</Text>

      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <Text style={styles.profileName}>{item.name}</Text>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: item.status === "active" ? echoselfTheme.colors.success : echoselfTheme.colors.error },
                ]}
              />
            </View>
            <Text style={styles.subText}>Last Sync: {new Date(item.last_sync).toLocaleString()}</Text>
            <Button
              title="Sync Now"
              onPress={() => syncProfile(item.id)}
              style={{ marginTop: echoselfTheme.spacing.sm }}
            />
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
  profileCard: { marginBottom: echoselfTheme.spacing.md },
  profileHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  profileName: { fontSize: 16, fontWeight: "600", color: echoselfTheme.colors.text },
  subText: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 4 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
});

export default EchoManager;
