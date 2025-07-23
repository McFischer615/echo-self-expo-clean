// components/ui/skeleton.tsx
import React from "react";
import styled from "styled-components/native";

interface SkeletonProps {
  width?: number | string;
  height?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = "100%", height = 20 }) => (
  <StyledSkeleton style={{ width, height }} />
);

const StyledSkeleton = styled.View`
  background-color: #e1e1e1;
  border-radius: 6px;
`;
