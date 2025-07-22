// components/ui/button.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

type ButtonVariant = "default" | "secondary" | "destructive" | "outline" | "ghost";
type ButtonSize = "sm" | "default" | "lg";

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "default",
  size = "default",
  onPress,
  style,
}) => {
  const sizeStyle =
    size === "sm"
      ? styles.sm
      : size === "lg"
      ? styles.lg
      : styles.defaultSize;

  const variantStyle =
    variant === "secondary"
      ? styles.secondary
      : variant === "destructive"
      ? styles.destructive
      : variant === "outline"
      ? styles.outline
      : variant === "ghost"
      ? styles.ghost
      : styles.default;

  return (
    <TouchableOpacity
      style={[styles.base, sizeStyle, variantStyle, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          variant === "outline" || variant === "ghost" ? { color: "#333" } : { color: "#fff" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  default: {
    backgroundColor: "#6C4EE3",
  },
  secondary: {
    backgroundColor: "#ccc",
  },
  destructive: {
    backgroundColor: "#b00020",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#333",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  sm: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  defaultSize: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
