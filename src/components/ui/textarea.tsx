// components/ui/textarea.tsx
import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

export const Textarea: React.FC<TextInputProps> = (props) => (
  <TextInput
    style={styles.textarea}
    multiline
    numberOfLines={4}
    {...props}
  />
);

const styles = StyleSheet.create({
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    textAlignVertical: "top",
  },
});
