import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { echoselfTheme } from "@/theme/echoself-theme";

interface OnboardingStep {
  title: string;
  description: string;
  image?: any; // local or remote image
}

interface OnboardingTourProps {
  steps: OnboardingStep[];
  onFinish: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ steps, onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  const step = steps[currentStep];

  return (
    <View style={styles.container}>
      {step.image && <Image source={step.image} style={styles.image} resizeMode="contain" />}
      <Text style={styles.title}>{step.title}</Text>
      <Text style={styles.description}>{step.description}</Text>

      <View style={styles.footer}>
        <Text style={styles.stepIndicator}>
          Step {currentStep + 1} of {steps.length}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{currentStep === steps.length - 1 ? "Finish" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: echoselfTheme.spacing.lg,
    backgroundColor: echoselfTheme.colors.surface,
    borderRadius: echoselfTheme.radius.lg,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: echoselfTheme.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: echoselfTheme.colors.primary,
    textAlign: "center",
    marginBottom: echoselfTheme.spacing.xs,
  },
  description: {
    fontSize: 14,
    color: echoselfTheme.colors.textSecondary,
    textAlign: "center",
    marginBottom: echoselfTheme.spacing.lg,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  stepIndicator: {
    fontSize: 12,
    color: echoselfTheme.colors.textSecondary,
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

export default OnboardingTour;
