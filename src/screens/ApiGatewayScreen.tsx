import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card, Button } from "@/components/ui";
import styled from "styled-components/native";

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
      <LoadingContainer>
        <ActivityIndicator size="large" color={echoselfTheme.colors.primary} />
        <LoadingText>Loading API Gateway Data...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <HeaderRow>
        <HeaderText>API Gateway</HeaderText>
        <Button title="Refresh" onPress={handleRefresh} style={{ width: 100 }} />
      </HeaderRow>

      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: echoselfTheme.spacing.sm, padding: echoselfTheme.spacing.sm }}>
            <RouteHeader>
              <RouteName>{item.name}</RouteName>
              <StatusDot
                color={
                  item.status === "active"
                    ? echoselfTheme.colors.success
                    : echoselfTheme.colors.error
                }
              />
            </RouteHeader>
            <RouteDetail>
              Requests: {item.request_count} | Latency: {item.latency}ms
            </RouteDetail>
          </Card>
        )}
      />
    </Container>
  );
};

export default ApiGatewayScreen;

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

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${echoselfTheme.spacing.md}px;
`;

const HeaderText = styled.Text`
  font-size: ${echoselfTheme.typography.heading.fontSize}px;
  font-weight: bold;
  color: ${echoselfTheme.colors.primary};
`;

const RouteHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const RouteName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${echoselfTheme.colors.text};
`;

const StatusDot = styled.View<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
`;

const RouteDetail = styled.Text`
  font-size: 12px;
  color: ${echoselfTheme.colors.textSecondary};
`;
