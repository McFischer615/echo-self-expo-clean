// components/ui/tooltip.tsx
import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Popover from "react-native-popover-view";

interface TooltipProps {
  label: string;
  content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ label, content }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  return (
    <View>
      <TouchableOpacity ref={ref} onPress={() => setVisible(true)}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
      <Popover
        isVisible={visible}
        from={ref}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.popover}>
          <Text>{content}</Text>
        </View>
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { color: "#6C4EE3", fontWeight: "600" },
  popover: { padding: 8 },
});
