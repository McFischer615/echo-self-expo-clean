import React, { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Button, Card } from "@/components/ui";
import styled from "styled-components/native";

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
    <Container>
      <Card style={{ padding: echoselfTheme.spacing.md }}>
        <Header>Create Echo</Header>

        <StyledInput
          placeholder="Echo Name"
          placeholderTextColor={echoselfTheme.colors.textSecondary}
          value={name}
          onChangeText={setName}
        />

        <StyledTextArea
          placeholder="Description"
          placeholderTextColor={echoselfTheme.colors.textSecondary}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {loading ? (
          <ActivityIndicator
            size="small"
            color={echoselfTheme.colors.primary}
            style={{ marginTop: echoselfTheme.spacing.sm }}
          />
        ) : (
          <Button
            title="Create Echo"
            onPress={handleCreateEcho}
            style={{ marginTop: echoselfTheme.spacing.sm }}
          />
        )}
      </Card>
    </Container>
  );
};

export default CreateEchoScreen;

//
// ✅ Styled Components
//
const Container = styled.View`
  flex: 1;
  background-color: ${echoselfTheme.colors.surface};
  padding: ${echoselfTheme.spacing.lg}px;
  justify-content: center;
`;

const Header = styled.Text`
  font-size: ${echoselfTheme.typography.heading.fontSize}px;
  font-weight: bold;
  color: ${echoselfTheme.colors.primary};
  margin-bottom: ${echoselfTheme.spacing.md}px;
  text-align: center;
`;

const StyledInput = styled.TextInput`
  border-width: 1px;
  border-color: ${echoselfTheme.colors.muted};
  border-radius: ${echoselfTheme.radius.sm}px;
  padding: ${echoselfTheme.spacing.sm}px;
  margin-bottom: ${echoselfTheme.spacing.sm}px;
  color: ${echoselfTheme.colors.text};
  background-color: ${echoselfTheme.colors.background};
`;

const StyledTextArea = styled(StyledInput)`
  height: 100px;
  text-align-vertical: top;
`;
