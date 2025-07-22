// components/ui/sidebar.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export const Sidebar: React.FC<{ children: React.ReactNode; width?: number }> = ({
  children,
  width = 240,
}) => (
  <View style={[styles.container, { width }]}>{children}</View>
);

export const SidebarItem: React.FC<{ label: string }> = ({ label }) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    paddingVertical: 10,
    height: "100%",
  },
  item: { padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
  label: { fontSize: 14, color: "#333" },
});
