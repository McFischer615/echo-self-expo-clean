// components/ui/toggle-group.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Toggle } from "./toggle";

interface ToggleGroupProps {
  options: string[];
  onChange?: (selected: string[]) => void;
  multiSelect?: boolean;
}

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
    <View style={styles.container}>
      {options.map((label) => (
        <Toggle
          key={label}
          label={label}
          initial={selected.includes(label)}
          onToggle={(state) => handleToggle(label, state)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 8 },
});
