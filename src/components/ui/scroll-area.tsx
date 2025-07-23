// components/ui/scroll-area.tsx
import React from "react";
import styled from "styled-components/native";

export const ScrollArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StyledScrollArea>{children}</StyledScrollArea>
);

const StyledScrollArea = styled.ScrollView`
  flex: 1;
`;
