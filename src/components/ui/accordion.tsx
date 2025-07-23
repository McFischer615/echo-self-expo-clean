import React, { useState, useRef, useEffect } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import styled from "styled-components/native";
import { ChevronDown } from "lucide-react-native";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const Container = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  margin-bottom: 5px;
`;

const Header = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 12px;
  padding-horizontal: 10px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const Content = styled.View`
  padding-horizontal: 10px;
  padding-vertical: 8px;
  background-color: #f9f9f9;
`;

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: expanded ? 180 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [expanded, rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Container>
      <Header onPress={() => setExpanded((prev) => !prev)}>
        <Title>{title}</Title>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <ChevronDown size={20} color="#6C4EE3" />
        </Animated.View>
      </Header>
      <Collapsible collapsed={!expanded}>
        <Content>{children}</Content>
      </Collapsible>
    </Container>
  );
};
