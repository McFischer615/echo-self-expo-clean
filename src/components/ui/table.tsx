// components/ui/table.tsx
import React from "react";
import styled from "styled-components/native";

const ScrollContainer = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))``;

const Container = styled.View``;

const Row = styled.View`
  flex-direction: row;
`;

const Cell = styled.Text`
  border-width: 1px;
  border-color: #ddd;
  padding: 6px;
  min-width: 80px;
`;

const HeaderCell = styled(Cell)`
  background-color: #f0f0f0;
  font-weight: 600;
`;

interface TableProps {
  headers: string[];
  rows: string[][];
}

export const Table: React.FC<TableProps> = ({ headers, rows }) => (
  <ScrollContainer>
    <Container>
      <Row>
        {headers.map((h, i) => (
          <HeaderCell key={i}>{h}</HeaderCell>
        ))}
      </Row>
      {rows.map((r, i) => (
        <Row key={i}>
          {r.map((c, j) => (
            <Cell key={j}>{c}</Cell>
          ))}
        </Row>
      ))}
    </Container>
  </ScrollContainer>
);
