import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card, Button } from "@/components/ui";
import styled from "styled-components/native";

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
      await supabase
        .from("echo_profiles")
        .update({ last_sync: new Date().toISOString() })
        .eq("id", id);
      fetchProfiles();
    } catch (error) {
      console.error("Error syncing profile:", error);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <LoadingText>Loading Echo Profiles...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>Echo Manager</Header>

      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: echoselfTheme.spacing.md }}>
            <ProfileHeader>
              <ProfileName>{item.name}</ProfileName>
              <StatusDot
                style={{
                  backgroundColor:
                    item.status === "active"
                      ? echoselfTheme.colors.success
                      : echoselfTheme.colors.error,
                }}
              />
            </ProfileHeader>
            <SubText>
              Last Sync: {new Date(item.last_sync).toLocaleString()}
            </SubText>
            <Button
              title="Sync Now"
              onPress={() => syncProfile(item.id)}
              style={{ marginTop: echoselfTheme.spacing.sm }}
            />
          </Card>
        )}
      />
    </Container>
  );
};

export default EchoManager;

//
// ✅ Styled Components
//
const Container = styled(ScrollView)`
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

const ProfileHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProfileName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${echoselfTheme.colors.text};
`;

const SubText = styled.Text`
  font-size: 12px;
  color: ${echoselfTheme.colors.textSecondary};
  margin-top: 4px;
`;

const StatusDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;
