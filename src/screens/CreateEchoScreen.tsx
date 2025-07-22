import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Button, Card } from "@/components/ui";

const CreateEchoScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateEcho = async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert("Validation Error", "Please provide both name and description.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.from("echo_profiles").insert([
        {
          name,
          description,
          status: "active",
        },
      ]);
      if (error) {
        Alert.alert("Error", error.message);
        return;
      }
      Alert.alert("Success", "Echo profile created successfully!");
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Error creating echo:", err);
      Alert.alert("Error", "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.formCard}>
        <Text style={styles.header}>Create Echo</Text>

        <TextInput
          style={styles.input}
          placeholder="Echo Name"
          placeholderTextColor={echoselfTheme.colors.textSecondary}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          placeholderTextColor={echoselfTheme.colors.textSecondary}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {loading ? (
          <ActivityIndicator size="small" color={echoselfTheme.colors.primary} style={{ marginTop: echoselfTheme.spacing.sm }} />
        ) : (
          <Button title="Create Echo" onPress={handleCreateEcho} style={{ marginTop: echoselfTheme.spacing.sm }} />
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: echoselfTheme.colors.surface,
    padding: echoselfTheme.spacing.lg,
    justifyContent: "center",
  },
  formCard: {
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default CreateEchoScreen;
