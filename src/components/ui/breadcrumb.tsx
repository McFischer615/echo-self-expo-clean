import React from "react";
import styled from "styled-components/native";
import { ChevronRight, MoreHorizontal } from "lucide-react-native";

interface BreadcrumbItemProps {
  label: string;
  onPress?: () => void;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <ItemContainer key={index}>
          {index > 0 && <ChevronRight size={14} color="#999" style={{ marginHorizontal: 4 }} />}
          {item.onPress && !item.isCurrent ? (
            <LinkButton onPress={item.onPress}>
              <LinkText>{item.label}</LinkText>
            </LinkButton>
          ) : (
            <Text isCurrent={item.isCurrent}>{item.label}</Text>
          )}
        </ItemContainer>
      ))}
      {items.length > 4 && <MoreHorizontal size={16} color="#999" />}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LinkButton = styled.TouchableOpacity``;

const LinkText = styled.Text`
  color: #6c4ee3;
  font-weight: 600;
`;

const Text = styled.Text<{ isCurrent?: boolean }>`
  color: ${({ isCurrent }) => (isCurrent ? "#333" : "#666")};
  font-weight: ${({ isCurrent }) => (isCurrent ? "bold" : "normal")};
`;
