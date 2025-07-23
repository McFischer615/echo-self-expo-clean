// components/ui/navigation-menu.tsx
import React from "react";
import styled from "styled-components/native";

interface NavItem {
  label: string;
  onPress: () => void;
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-vertical: 8px;
`;

const Item = styled.TouchableOpacity`
  padding: 6px;
`;

const Label = styled.Text`
  color: #6C4EE3;
  font-weight: 600;
`;

export const NavigationMenu: React.FC<{ items: NavItem[] }> = ({ items }) => (
  <Container>
    {items.map((item, i) => (
      <Item key={i} onPress={item.onPress}>
        <Label>{item.label}</Label>
      </Item>
    ))}
  </Container>
);
