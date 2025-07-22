// components/ui/context-menu.tsx
import React from "react";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Text, StyleSheet } from "react-native";

interface ContextMenuProps {
  triggerLabel: string;
  options: { label: string; onSelect: () => void }[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ triggerLabel, options }) => (
  <Menu>
    <MenuTrigger text={triggerLabel} customStyles={{ triggerText: styles.trigger }} />
    <MenuOptions>
      {options.map((opt, idx) => (
        <MenuOption key={idx} onSelect={opt.onSelect} text={opt.label} />
      ))}
    </MenuOptions>
  </Menu>
);

const styles = StyleSheet.create({
  trigger: { color: "#6C4EE3", fontWeight: "600" },
});
