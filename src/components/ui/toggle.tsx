// components/ui/toggle.tsx
import React, { useState } from "react";
import styled, { css } from "styled-components/native";

interface ToggleProps {
  label: string;
  initial?: boolean;
  onToggle?: (state: boolean) => void;
}

const ToggleButton = styled.TouchableOpacity<{ active: boolean }>`
  padding-vertical: 8px;
  padding-horizontal: 14px;
  border-radius: 6px;
  border-width: 1px;
  border-color: ${({ active }) => (active ? "#6C4EE3" : "#ccc")};
  background-color: ${({ active }) => (active ? "#6C4EE3" : "#f5f5f5")};
`;

const Label = styled.Text<{ active: boolean }>`
  font-weight: 600;
  color: ${({ active }) => (active ? "#fff" : "#333")};
`;

export const Toggle: React.FC<ToggleProps> = ({ label, initial = false, onToggle }) => {
  const [active, setActive] = useState(initial);

  const toggle = () => {
    const newState = !active;
    setActive(newState);
    onToggle?.(newState);
  };

  return (
    <ToggleButton active={active} onPress={toggle}>
      <Label active={active}>{label}</Label>
    </ToggleButton>
  );
};
