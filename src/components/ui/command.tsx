import React, { useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

interface CommandProps {
  items: string[];
  onSelect: (item: string) => void;
}

const Container = styled.View`
  padding: 10px;
`;

const StyledSearchbar = styled(Searchbar)`
  margin-bottom: 10px;
`;

const Item = styled.TouchableOpacity`
  padding-vertical: 8px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

const ItemText = styled.Text``;

export const Command: React.FC<CommandProps> = ({ items, onSelect }) => {
  const [query, setQuery] = useState("");

  const filtered = items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));

  return (
    <Container>
      <StyledSearchbar placeholder="Search..." value={query} onChangeText={setQuery} />
      {filtered.map((item) => (
        <Item key={item} onPress={() => onSelect(item)}>
          <ItemText>{item}</ItemText>
        </Item>
      ))}
    </Container>
  );
};
