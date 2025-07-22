import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";

interface TechItem {
  name: string;
  description?: string;
  icon?: any; // local or remote image
}

interface TechStackProps {
  techList: TechItem[];
  title?: string;
}

const TechStack: React.FC<TechStackProps> = ({ techList, title = "Tech Stack" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      {techList.map((tech, index) => (
        <Card key={index} style={styles.techCard}>
          <View style={styles.row}>
            {tech.icon && <Image source={tech.icon} style={styles.icon} resizeMode="contain" />}
            <View style={{ flex: 1 }}>
              <Text style={styles.techName}>{tech.name}</Text>
              {tech.description && <Text style={styles.description}>{tech.description}</Text>}
            </View>
          </View>
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
  techCard: {
    marginBottom: echoselfTheme.spacing.sm,
    padding: echoselfTheme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: echoselfTheme.spacing.sm,
  },
  techName: {
    fontSize: 14,
    fontWeight: "600",
    color: echoselfTheme.colors.text,
  },
  description: {
    fontSize: 12,
    color: echoselfTheme.colors.textSecondary,
    marginTop: 2,
  },
});

export default TechStack;
