import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";

interface Feature {
  title: string;
  description: string;
  icon: any; // can be local image or remote URL
}

const features: Feature[] = [
  {
    title: "Behavioral Insights",
    description: "Advanced analytics to understand decision-making patterns over time.",
    icon: require("@/assets/icons/insights.png"),
  },
  {
    title: "Predictive Modeling",
    description: "AI-powered models to predict outcomes based on historical trends.",
    icon: require("@/assets/icons/predictive.png"),
  },
  {
    title: "Context Awareness",
    description: "Enhanced context graphs to improve accuracy and personalized recommendations.",
    icon: require("@/assets/icons/context.png"),
  },
];

const FeatureShowcase: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Feature Showcase</Text>
      {features.map((feature, index) => (
        <Card key={index} style={styles.featureCard}>
          <View style={styles.featureRow}>
            <Image source={feature.icon} style={styles.icon} resizeMode="contain" />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{feature.title}</Text>
              <Text style={styles.description}>{feature.description}</Text>
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: echoselfTheme.spacing.md, backgroundColor: echoselfTheme.colors.surface },
  header: {
    fontSize: echoselfTheme.typography.heading.fontSize,
    fontWeight: "bold",
    color: echoselfTheme.colors.primary,
    marginBottom: echoselfTheme.spacing.md,
  },
  featureCard: { marginBottom: echoselfTheme.spacing.md },
  featureRow: { flexDirection: "row", alignItems: "center" },
  icon: { width: 40, height: 40, marginRight: echoselfTheme.spacing.sm },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", color: echoselfTheme.colors.text },
  description: { fontSize: 12, color: echoselfTheme.colors.textSecondary, marginTop: 2 },
});

export default FeatureShowcase;
