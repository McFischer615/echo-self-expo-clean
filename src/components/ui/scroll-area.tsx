// components/ui/scroll-area.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export const ScrollArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ScrollView style={styles.container}>{children}</ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
});
