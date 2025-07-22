// components/ui/dropdown-menu.tsx
import React, { useState } from "react";
import { Menu, Button } from "react-native-paper";

interface DropdownMenuProps {
  items: { label: string; onPress: () => void }[];
  buttonLabel: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, buttonLabel }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<Button onPress={() => setVisible(true)}>{buttonLabel}</Button>}
    >
      {items.map((item, i) => (
        <Menu.Item key={i} onPress={item.onPress} title={item.label} />
      ))}
    </Menu>
  );
};
