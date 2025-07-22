import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";

interface StakeItem {
  label: string;
  value: number | string;
  description?: string;
}

interface StakeSectionProps {
  stakes: StakeItem[];
  title?: string;
}

const StakeSection: React.FC<StakeSectionProps> = ({ stakes, title = "Your Stakes" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      {stakes.map((stake, index) => (
        <Card key={index} style={styles.stakeCard}>
          <Text style={styles.label}>{stake.label}</Text>
          <Text style={styles.value}>{stake.value}</Text>
          {stake.description && <Text style={styles.description}>{stake.description}</Text>}
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: echoselfTheme.spacing.md,
    backgroundColor: echoselfTheme.colors.surface,
    borderRadius: echoselfTheme.radius.lg,
    marginBottom: echoselfTheme.spacing.md,
  },
  header: {
    fontSize: echoselfTheme.typography.heading.fontSize,
    fontWeight: "bold",
    color: echoselfTheme.colors.primary,
    marginBottom: echoselfTheme.spacing.sm,
  },
  stakeCard: {
    marginBottom: echoselfTheme.spacing.sm,
    padding: echoselfTheme.spacing.sm,
  },
  label: {
    fontSize: 14,
    color: echoselfTheme.colors.textSecondary,
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: echoselfTheme.colors.text,
  },
  description: {
    fontSize: 12,
    color: echoselfTheme.colors.textSecondary,
    marginTop: 2,
  },
});

export default StakeSection;
