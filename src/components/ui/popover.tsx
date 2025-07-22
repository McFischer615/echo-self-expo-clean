// components/ui/popover.tsx
import React, { useState, useRef } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Popover from "react-native-popover-view";

interface PopoverProps {
  triggerLabel: string;
  content: string;
}

export const PopoverComponent: React.FC<PopoverProps> = ({ triggerLabel, content }) => {
  const [visible, setVisible] = useState(false);
  const touchableRef = useRef();

  return (
    <View>
      <TouchableOpacity ref={touchableRef} onPress={() => setVisible(true)}>
        <Text style={styles.trigger}>{triggerLabel}</Text>
      </TouchableOpacity>
      <Popover isVisible={visible} from={touchableRef} onRequestClose={() => setVisible(false)}>
        <View style={styles.popover}>
          <Text>{content}</Text>
        </View>
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  trigger: { color: "#6C4EE3" },
  popover: { padding: 10 },
});
