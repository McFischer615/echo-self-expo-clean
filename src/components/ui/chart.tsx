// components/ui/chart.tsx
import React from "react";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryTooltip } from "victory-native";
import { View, StyleSheet } from "react-native";

interface ChartProps {
  data: { x: string | number; y: number }[];
  color?: string;
}

export const ChartComponent: React.FC<ChartProps> = ({ data, color = "#6C4EE3" }) => {
  return (
    <View style={styles.container}>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryBar
          data={data}
          style={{ data: { fill: color } }}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
