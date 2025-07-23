import React from "react";
import styled from "styled-components/native";
import { TextInputProps } from "react-native";

const StyledInput = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
`;

export const Input: React.FC<TextInputProps> = (props) => (
  <StyledInput {...props} />
);
