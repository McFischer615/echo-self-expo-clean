import React, { useState, useRef } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styled from "styled-components/native";
import Popover from "react-native-popover-view";

interface PopoverProps {
  triggerLabel: string;
  content: string;
}

const TriggerText = styled.Text`
  color: #6c4ee3;
`;

const PopoverContent = styled.View`
  padding: 10px;
`;

export const PopoverComponent: React.FC<PopoverProps> = ({ triggerLabel, content }) => {
  const [visible, setVisible] = useState(false);
  const touchableRef = useRef<TouchableOpacity>(null);

  return (
    <View>
      <TouchableOpacity ref={touchableRef} onPress={() => setVisible(true)}>
        <TriggerText>{triggerLabel}</TriggerText>
      </TouchableOpacity>
      <Popover
        isVisible={visible}
        from={touchableRef}
        onRequestClose={() => setVisible(false)}
      >
        <PopoverContent>
          <Text>{content}</Text>
        </PopoverContent>
      </Popover>
    </View>
  );
};
