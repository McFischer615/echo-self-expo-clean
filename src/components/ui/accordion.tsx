// components/ui/accordion.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Collapsible from "react-native-collapsible";
import { ChevronDown } from "lucide-react-native";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const rotation = new Animated.Value(expanded ? 180 : 0);

  const toggle = () => {
    setExpanded(!expanded);
    Animated.timing(rotation, {
      toValue: expanded ? 0 : 180,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={stylesAcc.container}>
      <TouchableOpacity style={stylesAcc.header} onPress={toggle}>
        <Text style={stylesAcc.title}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <ChevronDown size={20} color="#6C4EE3" />
        </Animated.View>
      </TouchableOpacity>
      <Collapsible collapsed={!expanded}>
        <View style={stylesAcc.content}>{children}</View>
      </Collapsible>
    </View>
  );
};

const stylesAcc = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#f9f9f9",
  },
});
