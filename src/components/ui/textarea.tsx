// components/ui/textarea.tsx
import React from "react";
import styled from "styled-components/native";
import { TextInputProps } from "react-native";

export const Textarea: React.FC<TextInputProps> = (props) => (
  <StyledTextarea multiline numberOfLines={4} {...props} />
);

const StyledTextarea = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 6px;
  padding: 10px;
  text-align-vertical: top;
`;
