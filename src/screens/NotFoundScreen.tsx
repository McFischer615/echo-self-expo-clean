import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { echoselfTheme } from "@/theme/echoself-theme";
import styled from "styled-components/native";

interface NotFoundScreenProps {
  onGoHome: () => void;
}

const NotFoundScreen: React.FC<NotFoundScreenProps> = ({ onGoHome }) => {
  return (
    <Container>
      <Ionicons
        name="alert-circle-outline"
        size={64}
        color={echoselfTheme.colors.error}
        style={{ marginBottom: echoselfTheme.spacing.sm }}
      />
      <Title>Page Not Found</Title>
      <Description>
        The page you are looking for doesn't exist or may have been moved.
      </Description>

      <Button onPress={onGoHome}>
        <ButtonText>Go Back Home</ButtonText>
      </Button>
    </Container>
  );
};

export default NotFoundScreen;

//
// ✅ Styled Components
//
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${echoselfTheme.colors.surface};
  padding: ${echoselfTheme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: ${echoselfTheme.typography.heading.fontSize}px;
  font-weight: bold;
  color: ${echoselfTheme.colors.primary};
  margin-bottom: ${echoselfTheme.spacing.xs}px;
  text-align: center;
`;

const Description = styled.Text`
  font-size: 14px;
  color: ${echoselfTheme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${echoselfTheme.spacing.md}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${echoselfTheme.colors.primary};
  padding-vertical: ${echoselfTheme.spacing.sm}px;
  padding-horizontal: ${echoselfTheme.spacing.lg}px;
  border-radius: ${echoselfTheme.radius.md}px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;
