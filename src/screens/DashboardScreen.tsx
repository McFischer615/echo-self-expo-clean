import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

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
      <LoadingContainer>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <LoadingText>Loading Dashboard...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>Dashboard</Header>
      <FlatList
        data={metrics}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <Card style={{ width: "48%", padding: echoselfTheme.spacing.sm, marginBottom: echoselfTheme.spacing.sm }}>
            <MetricContent>
              <Ionicons name={item.icon as any} size={28} color={echoselfTheme.colors.primary} />
              <MetricTitle>{item.title}</MetricTitle>
              <MetricValue>{item.value}</MetricValue>
            </MetricContent>
          </Card>
        )}
      />

      <NavSection>
        <NavButton activeOpacity={0.7}>
          <Ionicons name="chatbubbles-outline" size={20} color={echoselfTheme.colors.primary} />
          <NavText>Chat with Echo</NavText>
        </NavButton>
        <NavButton activeOpacity={0.7}>
          <Ionicons name="create-outline" size={20} color={echoselfTheme.colors.primary} />
          <NavText>Create Echo</NavText>
        </NavButton>
      </NavSection>
    </Container>
  );
};

export default DashboardScreen;

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

const MetricContent = styled.View`
  align-items: center;
`;

const MetricTitle = styled.Text`
  font-size: 12px;
  color: ${echoselfTheme.colors.textSecondary};
  margin-top: 4px;
`;

const MetricValue = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${echoselfTheme.colors.text};
`;

const NavSection = styled.View`
  margin-top: ${echoselfTheme.spacing.lg}px;
`;

const NavButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${echoselfTheme.spacing.sm}px;
`;

const NavText = styled.Text`
  font-size: 14px;
  color: ${echoselfTheme.colors.text};
  margin-left: ${echoselfTheme.spacing.xs}px;
`;
