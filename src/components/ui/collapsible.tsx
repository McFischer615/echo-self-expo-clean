import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Collapsible from "react-native-collapsible";
import styled from "styled-components/native";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

const Container = styled(View)`
  margin-vertical: 4px;
`;

const Title = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: #6c4ee3;
`;

const Content = styled(View)`
  padding-vertical: 6px;
`;

export const CollapsibleComponent: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Title>{title}</Title>
      </TouchableOpacity>
      <Collapsible collapsed={!open}>
        <Content>{children}</Content>
      </Collapsible>
    </Container>
  );
};
