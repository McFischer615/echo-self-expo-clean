// components/ui/resizable.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

export const ResizablePanelGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: { flexDirection: "row", flex: 1 },
});
