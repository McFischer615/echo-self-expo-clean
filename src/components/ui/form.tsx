// components/ui/form.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm, FormProvider } from "react-hook-form";

export { Controller, useForm, FormProvider };

export const FormField = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    {children}
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  label: { fontWeight: "600", marginBottom: 4 },
  error: { color: "red", fontSize: 12 },
});
