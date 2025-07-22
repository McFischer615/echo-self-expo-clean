import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { echoselfTheme } from "@/theme/echoself-theme";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
  imageSource?: any; // local or remote image
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonLabel,
  onButtonPress,
  imageSource,
}) => {
  return (
    <View style={styles.container}>
      {imageSource && <Image source={imageSource} style={styles.image} resizeMode="contain" />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {buttonLabel && onButtonPress && (
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: echoselfTheme.spacing.lg,
    backgroundColor: echoselfTheme.colors.surface,
    borderRadius: echoselfTheme.radius.lg,
    marginBottom: echoselfTheme.spacing.md,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: echoselfTheme.spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: echoselfTheme.colors.primary,
    textAlign: "center",
    marginBottom: echoselfTheme.spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: echoselfTheme.colors.textSecondary,
    textAlign: "center",
    marginBottom: echoselfTheme.spacing.sm,
  },
  button: {
    backgroundColor: echoselfTheme.colors.primary,
    paddingVertical: echoselfTheme.spacing.sm,
    paddingHorizontal: echoselfTheme.spacing.lg,
    borderRadius: echoselfTheme.radius.md,
    marginTop: echoselfTheme.spacing.xs,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default HeroSection;
