// components/ui/checkbox.tsx
import React, { useState } from "react";
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

  return <PaperCheckbox status={value ? "checked" : "unchecked"} onPress={toggle} />;
};
