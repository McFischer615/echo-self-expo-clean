// components/ui/toggle.tsx
import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ToggleProps {
  label: string;
  initial?: boolean;
  onToggle?: (state: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, initial = false, onToggle }) => {
  const [active, setActive] = useState(initial);

  const toggle = () => {
    const newState = !active;
    setActive(newState);
    onToggle?.(newState);
  };

  return (
    <TouchableOpacity
      style={[styles.toggle, active ? styles.active : styles.inactive]}
      onPress={toggle}
    >
      <Text style={[styles.text, active && { color: "#fff" }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggle: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "transparent",
  },
  active: {
    backgroundColor: "#6C4EE3",
    borderColor: "#6C4EE3",
  },
  inactive: {
    backgroundColor: "#f5f5f5",
  },
  text: { fontWeight: "600", color: "#333" },
});
