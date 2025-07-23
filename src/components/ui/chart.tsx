import React from "react";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryTooltip } from "victory-native";
import styled from "styled-components/native";

interface ChartProps {
  data: { x: string | number; y: number }[];
  color?: string;
}

const Container = styled.View`
  align-items: center;
`;

export const ChartComponent: React.FC<ChartProps> = ({ data, color = "#6C4EE3" }) => {
  return (
    <Container>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryBar
          data={data}
          style={{ data: { fill: color } }}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </Container>
  );
};
