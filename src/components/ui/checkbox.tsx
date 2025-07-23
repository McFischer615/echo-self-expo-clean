// components/ui/checkbox.tsx
import React, { useState } from "react";
import styled from "styled-components/native";
import { Checkbox as PaperCheckbox } from "react-native-paper";

interface CheckboxProps {
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked = false, onToggle }) => {
  const [value, setValue] = useState(checked);

  const toggle = () => {
    const newValue = !value;
    setValue(newValue);
    onToggle?.(newValue);
  };

  return (
    <Wrapper>
      <PaperCheckbox status={value ? "checked" : "unchecked"} onPress={toggle} />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  padding: 4px;
`;
