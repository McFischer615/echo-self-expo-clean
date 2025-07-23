import React from "react";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import styled from "styled-components/native";

interface ContextMenuProps {
  triggerLabel: string;
  options: { label: string; onSelect: () => void }[];
}

const TriggerText = styled.Text`
  color: #6C4EE3;
  font-weight: 600;
`;

export const ContextMenu: React.FC<ContextMenuProps> = ({ triggerLabel, options }) => (
  <Menu>
    <MenuTrigger>
      <TriggerText>{triggerLabel}</TriggerText>
    </MenuTrigger>
    <MenuOptions>
      {options.map((opt, idx) => (
        <MenuOption key={idx} onSelect={opt.onSelect} text={opt.label} />
      ))}
    </MenuOptions>
  </Menu>
);
