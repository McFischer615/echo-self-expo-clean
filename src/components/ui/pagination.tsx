// components/ui/pagination.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      disabled={currentPage === 1}
      onPress={() => onPageChange(currentPage - 1)}
    >
      <Text style={styles.button}>Prev</Text>
    </TouchableOpacity>

    <Text style={styles.text}>
      {currentPage} / {totalPages}
    </Text>

    <TouchableOpacity
      disabled={currentPage === totalPages}
      onPress={() => onPageChange(currentPage + 1)}
    >
      <Text style={styles.button}>Next</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between", padding: 8 },
  button: { color: "#6C4EE3", fontWeight: "600" },
  text: { fontWeight: "500" },
});
