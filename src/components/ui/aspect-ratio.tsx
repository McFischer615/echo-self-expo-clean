// components/ui/aspect-ratio.tsx
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface AspectRatioProps {
  ratio?: number; // e.g., 16/9
  style?: ViewStyle;
  children: React.ReactNode;
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 1, // default 1:1 (square)
  style,
  children,
}) => {
  return (
    <View style={[styles.container, { aspectRatio: ratio }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
});
