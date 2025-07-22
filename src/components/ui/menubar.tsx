// components/ui/menubar.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Menu, Button } from "react-native-paper";

interface MenubarProps {
  items: { label: string; onPress: () => void }[];
  buttonLabel: string;
}

export const Menubar: React.FC<MenubarProps> = ({ items, buttonLabel }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Button onPress={() => setVisible(true)}>{buttonLabel}</Button>}
      >
        {items.map((item, i) => (
          <Menu.Item key={i} onPress={item.onPress} title={item.label} />
        ))}
      </Menu>
    </View>
  );
};
