import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Popover from "react-native-popover-view";
import { Ionicons } from "@expo/vector-icons";
import { echoselfTheme } from "@/theme/echoself-theme";

interface HelpTooltipProps {
  message: string;
  iconSize?: number;
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({ message, iconSize = 18 }) => {
  const [visible, setVisible] = useState(false);
  const touchableRef = useRef<TouchableOpacity>(null);

  return (
    <View>
      <TouchableOpacity ref={touchableRef} onPress={() => setVisible(true)}>
        <Ionicons name="help-circle-outline" size={iconSize} color={echoselfTheme.colors.primary} />
      </TouchableOpacity>

      <Popover
        isVisible={visible}
        from={touchableRef}
        onRequestClose={() => setVisible(false)}
        backgroundStyle={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        <View style={styles.tooltipBox}>
          <Text style={styles.tooltipText}>{message}</Text>
        </View>
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipBox: {
    padding: echoselfTheme.spacing.sm,
    backgroundColor: echoselfTheme.colors.surface,
    borderRadius: echoselfTheme.radius.sm,
    maxWidth: 220,
  },
  tooltipText: {
    fontSize: 12,
    color: echoselfTheme.colors.text,
  },
});

export default HelpTooltip;
