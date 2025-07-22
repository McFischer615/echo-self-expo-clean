// components/ui/card.tsx
import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.header}>{children}</View>
);

export const CardTitle: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.title}>{title}</Text>
);

export const CardDescription: React.FC<{ description: string }> = ({ description }) => (
  <Text style={styles.description}>{description}</Text>
);

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.content}>{children}</View>
);

export const CardFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
  },
  header: {
    paddingBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  content: {
    paddingVertical: 8,
  },
  footer: {
    paddingTop: 4,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
