// components/ui/skeleton.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

export const Skeleton: React.FC<{ width?: number | string; height?: number }> = ({
  width = "100%",
  height = 20,
}) => <View style={[styles.skeleton, { width, height }]} />;

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e1e1e1",
    borderRadius: 6,
  },
});
