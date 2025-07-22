// components/ui/command.tsx
import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

interface CommandProps {
  items: string[];
  onSelect: (item: string) => void;
}

export const Command: React.FC<CommandProps> = ({ items, onSelect }) => {
  const [query, setQuery] = useState("");

  const filtered = items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  search: {
    marginBottom: 10,
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});
