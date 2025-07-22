// components/ui/breadcrumb.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronRight, MoreHorizontal } from "lucide-react-native";

interface BreadcrumbItemProps {
  label: string;
  onPress?: () => void;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          {index > 0 && <ChevronRight size={14} color="#999" style={{ marginHorizontal: 4 }} />}
          {item.onPress && !item.isCurrent ? (
            <TouchableOpacity onPress={item.onPress}>
              <Text style={styles.link}>{item.label}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.text, item.isCurrent && styles.current]}>{item.label}</Text>
          )}
        </View>
      ))}
      {items.length > 4 && <MoreHorizontal size={16} color="#999" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    color: "#6C4EE3",
    fontWeight: "600",
  },
  text: {
    color: "#666",
  },
  current: {
    color: "#333",
    fontWeight: "bold",
  },
});
