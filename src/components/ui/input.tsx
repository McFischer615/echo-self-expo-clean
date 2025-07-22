// components/ui/input.tsx
import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

export const Input: React.FC<TextInputProps> = (props) => (
  <TextInput style={styles.input} {...props} />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
  },
});
