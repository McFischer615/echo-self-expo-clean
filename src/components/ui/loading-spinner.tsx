// components/ui/loading-spinner.tsx
import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "#6C4EE3",
}) => {
  const mapSize = size === "sm" ? 20 : size === "lg" ? 40 : 30;

  return (
    <SpinnerContainer>
      <ActivityIndicator size={mapSize} color={color} />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
