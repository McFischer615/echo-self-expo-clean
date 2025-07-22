// components/ui/hover-card.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface HoverCardProps {
  trigger: string;
  content: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({ trigger, content }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Text style={styles.trigger}>{trigger}</Text>
      </TouchableOpacity>
      {visible && <View style={styles.card}><Text>{content}</Text></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  trigger: { color: "#6C4EE3", fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 6,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 4,
  },
});
