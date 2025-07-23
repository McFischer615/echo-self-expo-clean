// components/ui/hover-card.tsx
import React, { useState } from "react";
import styled from "styled-components/native";

const Container = styled.View``;

const TriggerText = styled.Text`
  color: #6c4ee3;
  font-weight: 600;
`;

const Card = styled.View`
  background-color: #fff;
  padding: 8px;
  border-radius: 6px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  margin-top: 4px;
  elevation: 3; /* for android shadow */
`;

interface HoverCardProps {
  trigger: string;
  content: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({ trigger, content }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <TriggerText onPress={() => setVisible(!visible)}>{trigger}</TriggerText>
      {visible && <Card><Text>{content}</Text></Card>}
    </Container>
  );
};
