import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Button, Card } from "@/components/ui";

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out both fields.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert("Authentication Failed", error.message);
        return;
      }
      Alert.alert("Success", "Logged in successfully!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.authCard}>
        <Text style={styles.header}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={echoselfTheme.colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={echoselfTheme.colors.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {loading ? (
          <ActivityIndicator size="small" color={echoselfTheme.colors.primary} style={{ marginTop: echoselfTheme.spacing.sm }} />
        ) : (
          <Button title="Sign In" onPress={handleSignIn} style={{ marginTop: echoselfTheme.spacing.sm }} />
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: echoselfTheme.colors.surface,
    justifyContent: "center",
    padding: echoselfTheme.spacing.lg,
  },
  authCard: {
    padding: echoselfTheme.spacing.md,
  },
  header: {
    fontSize: echoselfTheme.typography.heading.fontSize,
    fontWeight: "bold",
    color: echoselfTheme.colors.primary,
    marginBottom: echoselfTheme.spacing.md,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: echoselfTheme.colors.muted,
    borderRadius: echoselfTheme.radius.sm,
    padding: echoselfTheme.spacing.sm,
    marginBottom: echoselfTheme.spacing.sm,
    color: echoselfTheme.colors.text,
    backgroundColor: echoselfTheme.colors.background,
  },
});

export default AuthScreen;
