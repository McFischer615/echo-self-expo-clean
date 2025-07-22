// components/ui/navigation-menu.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface NavItem {
  label: string;
  onPress: () => void;
}

export const NavigationMenu: React.FC<{ items: NavItem[] }> = ({ items }) => (
  <View style={styles.container}>
    {items.map((item, i) => (
      <TouchableOpacity key={i} onPress={item.onPress} style={styles.item}>
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 8 },
  item: { padding: 6 },
  label: { color: "#6C4EE3", fontWeight: "600" },
});
