import React from "react";
import { Text } from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components/native";

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const ModalWrapper = styled(Modal).attrs({
  style: { justifyContent: "flex-end", margin: 0 },
  onBackdropPress: (props: DrawerProps) => props.onClose,
})``;

const Container = styled.View`
  background-color: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Drawer: React.FC<DrawerProps> = ({ visible, onClose, title, children }) => (
  <Modal isVisible={visible} onBackdropPress={onClose} style={{ justifyContent: "flex-end", margin: 0 }}>
    <Container>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  </Modal>
);
