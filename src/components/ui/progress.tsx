// components/ui/progress.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

export const Progress: React.FC<{ value: number }> = ({ value }) => (
  <View style={styles.container}>
    <View style={[styles.bar, { width: `${value}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 4,
  },
  bar: {
    height: "100%",
    backgroundColor: "#6C4EE3",
    borderRadius: 4,
  },
});
