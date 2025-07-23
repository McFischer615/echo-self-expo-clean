// components/ui/radio-group.tsx
import React from "react";
import styled from "styled-components/native";
import { RadioButton } from "react-native-paper";

interface RadioGroupProps {
  options: { label: string; value: string }[];
  value: string;
  onValueChange: (v: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onValueChange }) => (
  <RadioButton.Group onValueChange={onValueChange} value={value}>
    <Container>
      {options.map((o, i) => (
        <RadioButton.Item key={i} label={o.label} value={o.value} />
      ))}
    </Container>
  </RadioButton.Group>
);

const Container = styled.View`
  padding: 4px 0;
`;
