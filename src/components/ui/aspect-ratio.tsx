// components/ui/aspect-ratio.tsx
import React from "react";
import styled from "styled-components/native";

interface AspectRatioProps {
  ratio?: number; // e.g., 16/9
  style?: any;
  children: React.ReactNode;
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 1,
  style,
  children,
}) => {
  return <Container ratio={ratio} style={style}>{children}</Container>;
};

const Container = styled.View<{ ratio: number }>`
  width: 100%;
  overflow: hidden;
  aspect-ratio: ${({ ratio }) => ratio};
`;
