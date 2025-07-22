// components/ui/badge.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = "default" }) => {
  const variantStyle =
    variant === "secondary"
      ? styles.secondary
      : variant === "destructive"
      ? styles.destructive
      : variant === "outline"
      ? styles.outline
      : styles.default;

  return (
    <View style={[styles.base, variantStyle]}>
      <Text
        style={[
          styles.text,
          variant === "outline" ? { color: "#333" } : { color: "#fff" },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
  default: {
    backgroundColor: "#6C4EE3",
    borderColor: "#6C4EE3",
  },
  secondary: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
  destructive: {
    backgroundColor: "#b00020",
    borderColor: "#b00020",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#333",
  },
});
