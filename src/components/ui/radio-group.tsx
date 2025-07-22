// components/ui/radio-group.tsx
import React from "react";
import { RadioButton } from "react-native-paper";
import { View } from "react-native";

interface RadioGroupProps {
  options: { label: string; value: string }[];
  value: string;
  onValueChange: (v: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onValueChange }) => (
  <RadioButton.Group onValueChange={onValueChange} value={value}>
    <View>
      {options.map((o, i) => (
        <RadioButton.Item key={i} label={o.label} value={o.value} />
      ))}
    </View>
  </RadioButton.Group>
);
