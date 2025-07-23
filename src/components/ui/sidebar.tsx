// components/ui/sidebar.tsx
import React from "react";
import styled from "styled-components/native";

const Container = styled.View<{ width: number }>`
  background-color: #f7f7f7;
  padding-vertical: 10px;
  height: 100%;
  width: ${({ width }) => width}px;
`;

const Item = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-color: #ddd;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #333;
`;

export const Sidebar: React.FC<{ children: React.ReactNode; width?: number }> = ({
  children,
  width = 240,
}) => <Container width={width}>{children}</Container>;

export const SidebarItem: React.FC<{ label: string }> = ({ label }) => (
  <Item>
    <Label>{label}</Label>
  </Item>
);
