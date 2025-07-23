// components/ui/sheet.tsx
import React from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";

interface SheetProps {
  visible: boolean;
  onClose: () => void;
  side?: "top" | "bottom" | "left" | "right";
  title?: string;
  children: React.ReactNode;
}

const Container = styled.View<{ side: string }>`
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  ${({ side }) => side === "bottom" && `
    position: absolute;
    bottom: 0;
    width: 100%;
  `}
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Sheet: React.FC<SheetProps> = ({
  visible,
  onClose,
  side = "right",
  title,
  children,
}) => {
  const animationIn = side === "bottom" ? "slideInUp" : side === "top" ? "slideInDown" : "slideInRight";
  const animationOut = side === "bottom" ? "slideOutDown" : side === "top" ? "slideOutUp" : "slideOutRight";

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} animationIn={animationIn} animationOut={animationOut}>
      <Container side={side}>
        {title && <Title>{title}</Title>}
        {children}
      </Container>
    </Modal>
  );
};
