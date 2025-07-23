import React from "react";
import styled from "styled-components/native";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
`;

const ButtonText = styled.Text<{ disabled?: boolean }>`
  color: ${({ disabled }) => (disabled ? "#aaa" : "#6C4EE3")};
  font-weight: 600;
`;

const PageText = styled.Text`
  font-weight: 500;
`;

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <Container>
    <ButtonText
      disabled={currentPage === 1}
      onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
    >
      Prev
    </ButtonText>

    <PageText>
      {currentPage} / {totalPages}
    </PageText>

    <ButtonText
      disabled={currentPage === totalPages}
      onPress={() => currentPage < totalPages && onPageChange(currentPage + 1)}
    >
      Next
    </ButtonText>
  </Container>
);
