import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { supabase } from "../services/supabaseClient";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Button, Card } from "@/components/ui";
import styled from "styled-components/native";

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
    <Container>
      <Card style={{ padding: echoselfTheme.spacing.md }}>
        <HeaderText>Sign In</HeaderText>

        <StyledInput
          placeholder="Email"
          placeholderTextColor={echoselfTheme.colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <StyledInput
          placeholder="Password"
          placeholderTextColor={echoselfTheme.colors.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {loading ? (
          <ActivityIndicator
            size="small"
            color={echoselfTheme.colors.primary}
            style={{ marginTop: echoselfTheme.spacing.sm }}
          />
        ) : (
          <Button
            title="Sign In"
            onPress={handleSignIn}
            style={{ marginTop: echoselfTheme.spacing.sm }}
          />
        )}
      </Card>
    </Container>
  );
};

export default AuthScreen;

//
// ✅ Styled Components
//
const Container = styled.View`
  flex: 1;
  background-color: ${echoselfTheme.colors.surface};
  justify-content: center;
  padding: ${echoselfTheme.spacing.lg}px;
`;

const HeaderText = styled.Text`
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
