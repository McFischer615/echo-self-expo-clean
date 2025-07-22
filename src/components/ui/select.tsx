// components/ui/select.tsx
import React, { useState } from "react";
import { Menu, Button } from "react-native-paper";

interface SelectProps {
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ options, selected, onSelect }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<Button onPress={() => setVisible(true)}>{selected || "Select"}</Button>}
    >
      {options.map((opt, i) => (
        <Menu.Item key={i} onPress={() => { onSelect(opt.value); setVisible(false); }} title={opt.label} />
      ))}
    </Menu>
  );
};
