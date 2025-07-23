import React from "react";
import Modal from "react-native-modal";
import styled from "styled-components/native";

interface AlertDialogProps {
  visible: boolean;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  visible,
  title = "Alert",
  description = "",
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.6}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <Container>
        <Title>{title}</Title>
        {description ? <Description>{description}</Description> : null}
        <Footer>
          <CancelButton onPress={onCancel}>
            <CancelText>{cancelText}</CancelText>
          </CancelButton>
          <ConfirmButton onPress={onConfirm}>
            <ConfirmText>{confirmText}</ConfirmText>
          </ConfirmButton>
        </Footer>
      </Container>
    </Modal>
  );
};

const Container = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #6c4ee3; /* SafeTea purple */
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const CancelButton = styled.TouchableOpacity`
  flex: 1;
  margin-right: 5px;
  padding: 12px;
  background-color: #f0f0f0;
  border-radius: 8px;
  align-items: center;
`;

const ConfirmButton = styled.TouchableOpacity`
  flex: 1;
  margin-left: 5px;
  padding: 12px;
  background-color: #6c4ee3;
  border-radius: 8px;
  align-items: center;
`;

const CancelText = styled.Text`
  color: #333;
  font-weight: 600;
`;

const ConfirmText = styled.Text`
  color: white;
  font-weight: 600;
`;
