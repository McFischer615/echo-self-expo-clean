import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Popover from "react-native-popover-view";

interface TooltipProps {
  label: string;
  content: string;
}

const LabelText = styled.Text`
  color: #6c4ee3;
  font-weight: 600;
`;

const PopoverContent = styled.View`
  padding: 8px;
`;

export const Tooltip: React.FC<TooltipProps> = ({ label, content }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<TouchableOpacity>(null);

  return (
    <View>
      <TouchableOpacity ref={ref} onPress={() => setVisible(true)}>
        <LabelText>{label}</LabelText>
      </TouchableOpacity>
      <Popover
        isVisible={visible}
        from={ref}
        onRequestClose={() => setVisible(false)}
      >
        <PopoverContent>
          <Text>{content}</Text>
        </PopoverContent>
      </Popover>
    </View>
  );
};
