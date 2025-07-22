import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";

const HomeScreen: React.FC = () => {
  const quickActions = [
    {
      label: "Chat with Echo",
      icon: "chatbubbles-outline",
      onPress: () => console.log("Navigate to Chat"),
    },
    {
      label: "Create Echo",
      icon: "create-outline",
      onPress: () => console.log("Navigate to Create Echo"),
    },
    {
      label: "View Dashboard",
      icon: "grid-outline",
      onPress: () => console.log("Navigate to Dashboard"),
    },
    {
      label: "Developer Portal",
      icon: "code-slash-outline",
      onPress: () => console.log("Navigate to Developer Portal"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.heroCard}>
        <Image
          source={require("@/assets/images/echoself_logo.png")}
          style={styles.heroImage}
          resizeMode="contain"
        />
        <Text style={styles.heroTitle}>Welcome to EchoSelf</Text>
        <Text style={styles.heroSubtitle}>
          Your personal AI-driven behavioral twin for smarter decisions.
        </Text>
      </Card>

      <Text style={styles.sectionHeader}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionButton}
            onPress={action.onPress}
          >
            <Ionicons
              name={action.icon as any}
              size={28}
              color={echoselfTheme.colors.primary}
            />
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: echoselfTheme.colors.surface,
    padding: echoselfTheme.spacing.md,
  },
  heroCard: {
    alignItems: "center",
    padding: echoselfTheme.spacing.lg,
    marginBottom: echoselfTheme.spacing.md,
  },
  heroImage: {
    width: 100,
    height: 100,
    marginBottom: echoselfTheme.spacing.sm,
  },
  heroTitle: {
    fontSize: echoselfTheme.typography.heading.fontSize,
    fontWeight: "bold",
    color: echoselfTheme.colors.primary,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 14,
    color: echoselfTheme.colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: echoselfTheme.colors.text,
    marginVertical: echoselfTheme.spacing.sm,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    backgroundColor: echoselfTheme.colors.background,
    borderRadius: echoselfTheme.radius.md,
    alignItems: "center",
    paddingVertical: echoselfTheme.spacing.md,
    marginBottom: echoselfTheme.spacing.sm,
  },
  actionLabel: {
    fontSize: 12,
    color: echoselfTheme.colors.text,
    marginTop: 4,
  },
});

export default HomeScreen;
