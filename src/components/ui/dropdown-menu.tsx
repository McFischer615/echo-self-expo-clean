// components/ui/dropdown-menu.tsx
import React, { useState } from "react";
import styled from "styled-components/native";
import { Menu as PaperMenu, Button as PaperButton } from "react-native-paper";

interface DropdownMenuProps {
  items: { label: string; onPress: () => void }[];
  buttonLabel: string;
}

// Optional styled wrappers if you want to customize:
const StyledMenu = styled(PaperMenu)`
  /* add custom styles here if needed */
`;

const StyledButton = styled(PaperButton)`
  /* add custom styles here if needed */
`;

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, buttonLabel }) => {
  const [visible, setVisible] = useState(false);

  return (
    <StyledMenu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<StyledButton onPress={() => setVisible(true)}>{buttonLabel}</StyledButton>}
    >
      {items.map((item, i) => (
        <PaperMenu.Item key={i} onPress={item.onPress} title={item.label} />
      ))}
    </StyledMenu>
  );
};
