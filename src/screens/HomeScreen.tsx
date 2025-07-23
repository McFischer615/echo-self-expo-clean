import React from "react";
import { ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import styled from "styled-components/native";

const HomeScreen: React.FC = () => {
  const quickActions = [
    {
      label: "Chat with Echo",
      icon: "chatbubbles-outline",
      onPress: () => console.log("Navigate to Chat"),
    },
    {
      label: "Create Echo",
      icon: "create-outline",
      onPress: () => console.log("Navigate to Create Echo"),
    },
    {
      label: "View Dashboard",
      icon: "grid-outline",
      onPress: () => console.log("Navigate to Dashboard"),
    },
    {
      label: "Developer Portal",
      icon: "code-slash-outline",
      onPress: () => console.log("Navigate to Developer Portal"),
    },
  ];

  return (
    <Container>
      <Card style={{ alignItems: "center", padding: echoselfTheme.spacing.lg, marginBottom: echoselfTheme.spacing.md }}>
        <HeroImage
          source={require("@/assets/images/echoself_logo.png")}
          resizeMode="contain"
        />
        <HeroTitle>Welcome to EchoSelf</HeroTitle>
        <HeroSubtitle>
          Your personal AI-driven behavioral twin for smarter decisions.
        </HeroSubtitle>
      </Card>

      <SectionHeader>Quick Actions</SectionHeader>
      <ActionsGrid>
        {quickActions.map((action, index) => (
          <ActionButton key={index} onPress={action.onPress}>
            <Ionicons
              name={action.icon as any}
              size={28}
              color={echoselfTheme.colors.primary}
            />
            <ActionLabel>{action.label}</ActionLabel>
          </ActionButton>
        ))}
      </ActionsGrid>
    </Container>
  );
};

export default HomeScreen;

//
// ✅ Styled Components
//
const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${echoselfTheme.colors.surface};
  padding: ${echoselfTheme.spacing.md}px;
`;

const HeroImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin-bottom: ${echoselfTheme.spacing.sm}px;
`;

const HeroTitle = styled.Text`
  font-size: ${echoselfTheme.typography.heading.fontSize}px;
  font-weight: bold;
  color: ${echoselfTheme.colors.primary};
  text-align: center;
`;

const HeroSubtitle = styled.Text`
  font-size: 14px;
  color: ${echoselfTheme.colors.textSecondary};
  text-align: center;
  margin-top: 4px;
`;

const SectionHeader = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${echoselfTheme.colors.text};
  margin-vertical: ${echoselfTheme.spacing.sm}px;
`;

const ActionsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ActionButton = styled(TouchableOpacity)`
  width: 48%;
  background-color: ${echoselfTheme.colors.background};
  border-radius: ${echoselfTheme.radius.md}px;
  align-items: center;
  padding-vertical: ${echoselfTheme.spacing.md}px;
  margin-bottom: ${echoselfTheme.spacing.sm}px;
`;

const ActionLabel = styled.Text`
  font-size: 12px;
  color: ${echoselfTheme.colors.text};
  margin-top: 4px;
`;
