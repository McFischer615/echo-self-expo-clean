// components/ui/resizable.tsx
import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const ResizablePanelGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container>{children}</Container>
);
