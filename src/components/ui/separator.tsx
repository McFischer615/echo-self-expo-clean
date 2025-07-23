import React from "react";
import styled from "styled-components/native";

export const Separator: React.FC<{ orientation?: "horizontal" | "vertical" }> = ({
  orientation = "horizontal",
}) => (
  <>{orientation === "horizontal" ? <Horizontal /> : <Vertical />}</>
);

const Horizontal = styled.View`
  height: 1px;
  background-color: #ccc;
  width: 100%;
  margin-vertical: 4px;
`;

const Vertical = styled.View`
  width: 1px;
  background-color: #ccc;
  height: 100%;
`;
