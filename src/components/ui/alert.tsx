// components/ui/alert.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AlertProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const Alert: React.FC<AlertProps> = ({ title, description, variant = "default" }) => {
  const isDestructive = variant === "destructive";
  return (
    <View
      style={[
        stylesAlert.container,
        isDestructive ? stylesAlert.destructive : stylesAlert.default,
      ]}
    >
      <Text style={[stylesAlert.title, isDestructive && { color: "#b00020" }]}>{title}</Text>
      {description ? <Text style={stylesAlert.description}>{description}</Text> : null}
    </View>
  );
};

const stylesAlert = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    marginVertical: 5,
  },
  default: {
    backgroundColor: "#f7f7ff",
    borderColor: "#6C4EE3",
  },
  destructive: {
    backgroundColor: "#fff5f5",
    borderColor: "#b00020",
  },
  title: {
    fontWeight: "600",
    fontSize: 15,
    color: "#333",
  },
  description: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
});
