// components/ui/label.tsx
import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";

export const Label: React.FC<TextProps> = ({ children, style, ...props }) => (
  <Text style={[styles.label, style]} {...props}>{children}</Text>
);

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
});
