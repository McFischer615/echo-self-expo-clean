// components/ui/table.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export const Table: React.FC<{ headers: string[]; rows: string[][] }> = ({ headers, rows }) => (
  <ScrollView horizontal>
    <View>
      <View style={styles.row}>
        {headers.map((h, i) => (
          <Text key={i} style={[styles.cell, styles.header]}>{h}</Text>
        ))}
      </View>
      {rows.map((r, i) => (
        <View key={i} style={styles.row}>
          {r.map((c, j) => (
            <Text key={j} style={styles.cell}>{c}</Text>
          ))}
        </View>
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  cell: { borderWidth: 1, borderColor: "#ddd", padding: 6, minWidth: 80 },
  header: { backgroundColor: "#f0f0f0", fontWeight: "600" },
});
