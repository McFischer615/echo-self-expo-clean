import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card, Button } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import styled from "styled-components/native";

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
      <LoadingContainer>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <LoadingText>Loading Developer Portal...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>Developer Portal</Header>
      <Button
        title="Refresh Keys"
        onPress={fetchApiKeys}
        style={{ marginBottom: echoselfTheme.spacing.md }}
      />

      <FlatList
        data={keys}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: echoselfTheme.spacing.sm, padding: echoselfTheme.spacing.sm }}>
            <KeyName>{item.name}</KeyName>
            <KeyRow>
              <KeyText>{item.key.slice(0, 15)}...</KeyText>
              <TouchableOpacity onPress={() => copyKey(item.key)}>
                <Ionicons name="copy-outline" size={18} color={echoselfTheme.colors.primary} />
              </TouchableOpacity>
            </KeyRow>
            <CreatedAt>
              Created: {new Date(item.created_at).toLocaleDateString()}
            </CreatedAt>
          </Card>
        )}
      />
    </Container>
  );
};

export default DeveloperPortalScreen;

//
// ✅ Styled Components
//
const Container = styled.View`
  flex: 1;
  background-color: ${echoselfTheme.colors.surface};
  padding: ${echoselfTheme.spacing.md}px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  margin-top: 8px;
  color: ${echoselfTheme.colors.textSecondary};
`;

const Header = styled.Text`
  font-size: ${echoselfTheme.typography.heading.fontSize}px;
  font-weight: bold;
  color: ${echoselfTheme.colors.primary};
  margin-bottom: ${echoselfTheme.spacing.md}px;
`;

const KeyName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${echoselfTheme.colors.text};
  margin-bottom: 4px;
`;

const KeyRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const KeyText = styled.Text`
  font-size: 12px;
  color: ${echoselfTheme.colors.textSecondary};
`;

const CreatedAt = styled.Text`
  font-size: 10px;
  color: ${echoselfTheme.colors.textSecondary};
`;
