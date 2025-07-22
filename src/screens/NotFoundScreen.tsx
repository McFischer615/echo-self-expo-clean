import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { echoselfTheme } from "@/theme/echoself-theme";

interface NotFoundScreenProps {
  onGoHome: () => void;
}

const NotFoundScreen: React.FC<NotFoundScreenProps> = ({ onGoHome }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="alert-circle-outline"
        size={64}
        color={echoselfTheme.colors.error}
        style={{ marginBottom: echoselfTheme.spacing.sm }}
      />
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.description}>
        The page you are looking for doesn't exist or may have been moved.
      </Text>

      <TouchableOpacity style={styles.button} onPress={onGoHome}>
        <Text style={styles.buttonText}>Go Back Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: echoselfTheme.colors.surface,
    padding: echoselfTheme.spacing.lg,
  },
  title: {
    fontSize: echoselfTheme.typography.heading.fontSize,
    fontWeight: "bold",
    color: echoselfTheme.colors.primary,
    marginBottom: echoselfTheme.spacing.xs,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: echoselfTheme.colors.textSecondary,
    textAlign: "center",
    marginBottom: echoselfTheme.spacing.md,
  },
  button: {
    backgroundColor: echoselfTheme.colors.primary,
    paddingVertical: echoselfTheme.spacing.sm,
    paddingHorizontal: echoselfTheme.spacing.lg,
    borderRadius: echoselfTheme.radius.md,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default NotFoundScreen;
