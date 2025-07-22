// components/ui/separator.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

export const Separator: React.FC<{ orientation?: "horizontal" | "vertical" }> = ({
  orientation = "horizontal",
}) => (
  <View style={orientation === "horizontal" ? styles.horizontal : styles.vertical} />
);

const styles = StyleSheet.create({
  horizontal: { height: 1, backgroundColor: "#ccc", width: "100%", marginVertical: 4 },
  vertical: { width: 1, backgroundColor: "#ccc", height: "100%" },
});
