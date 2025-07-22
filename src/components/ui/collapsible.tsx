// components/ui/collapsible.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

export const CollapsibleComponent: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={!open}>
        <View style={styles.content}>{children}</View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6C4EE3",
  },
  content: {
    paddingVertical: 6,
  },
});
