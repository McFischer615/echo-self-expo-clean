// components/ui/loading-spinner.tsx
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <ActivityIndicator size={mapSize} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
});
