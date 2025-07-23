import React from "react";
import styled from "styled-components/native";

export const Progress: React.FC<{ value: number }> = ({ value }) => (
  <Container>
    <Bar style={{ width: `${value}%` }} />
  </Container>
);

const Container = styled.View`
  height: 8px;
  width: 100%;
  background-color: #eee;
  border-radius: 4px;
`;

const Bar = styled.View`
  height: 100%;
  background-color: #6c4ee3;
  border-radius: 4px;
`;
