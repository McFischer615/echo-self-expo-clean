import React, { useState } from "react";
import styled from "styled-components/native";
import { Toggle } from "./toggle";

interface ToggleGroupProps {
  options: string[];
  onChange?: (selected: string[]) => void;
  multiSelect?: boolean;
}

const Container = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  onChange,
  multiSelect = false,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (label: string, active: boolean) => {
    let updated = multiSelect
      ? active
        ? [...selected, label]
        : selected.filter((s) => s !== label)
      : active
      ? [label]
      : [];
    setSelected(updated);
    onChange?.(updated);
  };

  return (
    <Container>
      {options.map((label) => (
        <Toggle
          key={label}
          label={label}
          initial={selected.includes(label)}
          onToggle={(state) => handleToggle(label, state)}
        />
      ))}
    </Container>
  );
};
