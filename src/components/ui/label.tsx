import React from "react";
import styled from "styled-components/native";
import { TextProps } from "react-native";

const StyledLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const Label: React.FC<TextProps> = ({ children, ...props }) => (
  <StyledLabel {...props}>{children}</StyledLabel>
);
