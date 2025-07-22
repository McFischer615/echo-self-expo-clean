import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../services/supabaseClient";
import { Ionicons } from "@expo/vector-icons";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card, Badge } from "@/components/ui";

interface AIProvider {
  id: string;
  name: string;
  display_name: string;
  status: string;
  priority: number;
  model_capabilities: string[];
}

interface AIModel {
  id: string;
  provider_id: string;
  model_name: string;
  display_name: string;
  context_window: number;
  max_tokens: number;
  supports_vision: boolean;
  capabilities: string[];
}

interface Props {
  selectedProvider?: string;
  selectedModel?: string;
  onProviderChange: (provider: string) => void;
  onModelChange: (model: string) => void;
}

const AIProviderSelector: React.FC<Props> = ({
  selectedProvider,
  selectedModel,
  onProviderChange,
  onModelChange,
}) => {
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProvidersAndModels();
  }, []);

  const fetchProvidersAndModels = async () => {
    try {
      const [providersResponse, modelsResponse] = await Promise.all([
        supabase.from("ai_providers").select("*").eq("status", "active").order("priority"),
        supabase.from("ai_models").select("*").eq("status", "active"),
      ]);
      if (providersResponse.data) setProviders(providersResponse.data as any);
      if (modelsResponse.data) setModels(modelsResponse.data as any);
    } catch (error) {
      console.error("Error fetching AI providers:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedProviderData = providers.find((p) => p.name === selectedProvider);
  const availableModels = models.filter((m) => m.provider_id === selectedProviderData?.id);

  const getCapabilityIcon = (capability: string) => {
    switch (capability) {
      case "vision":
        return <Ionicons name="eye-outline" size={14} color={echoselfTheme.colors.primary} />;
      case "fast_response":
        return <Ionicons name="flash-outline" size={14} color={echoselfTheme.colors.warning} />;
      case "advanced_reasoning":
        return <Ionicons name="brain-outline" size={14} color={echoselfTheme.colors.success} />;
      case "multimodal":
        return <Ionicons name="chatbubble-ellipses-outline" size={14} color="#06B6D4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <Text style={styles.loadingText}>Loading Providers...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>AI Provider & Model</Text>

      <Card style={styles.section}>
        <Text style={styles.label}>Provider</Text>
        <Picker selectedValue={selectedProvider} onValueChange={(value) => onProviderChange(value)}>
          <Picker.Item label="Select AI provider" value="" />
          {providers.map((provider) => (
            <Picker.Item key={provider.id} label={provider.display_name} value={provider.name} />
          ))}
        </Picker>
        {selectedProviderData && (
          <View style={styles.capabilitiesRow}>
            {selectedProviderData.model_capabilities?.map((capability, index) => (
              <View key={index} style={styles.badge}>
                {getCapabilityIcon(capability)}
                <Text style={styles.badgeText}> {capability}</Text>
              </View>
            ))}
          </View>
        )}
      </Card>

      {selectedProviderData && (
        <Card style={styles.section}>
          <Text style={styles.label}>Model</Text>
          <Picker selectedValue={selectedModel} onValueChange={(value) => onModelChange(value)}>
            <Picker.Item label="Select Model" value="" />
            {availableModels.map((model) => (
              <Picker.Item key={model.id} label={model.display_name} value={model.model_name} />
            ))}
          </Picker>
          {selectedModel &&
            availableModels
              .find((m) => m.model_name === selectedModel)
              ?.capabilities?.map((capability, index) => (
                <View key={index} style={styles.badge}>
                  {getCapabilityIcon(capability)}
                  <Text style={styles.badgeText}> {capability}</Text>
                </View>
              ))}
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: echoselfTheme.spacing.md, backgroundColor: echoselfTheme.colors.background },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: echoselfTheme.spacing.lg },
  loadingText: { color: echoselfTheme.colors.primary, marginTop: 8 },
  header: {
    fontSize: echoselfTheme.typography.heading.fontSize,
    fontWeight: "bold",
    color: echoselfTheme.colors.primary,
    marginBottom: echoselfTheme.spacing.md,
  },
  section: { marginBottom: echoselfTheme.spacing.md },
  label: {
    fontSize: echoselfTheme.typography.body.fontSize,
    fontWeight: "600",
    color: echoselfTheme.colors.text,
    marginBottom: echoselfTheme.spacing.sm,
  },
  capabilitiesRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 6 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: echoselfTheme.colors.surface,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  badgeText: { fontSize: 12, color: echoselfTheme.colors.textSecondary },
});

export default AIProviderSelector;
