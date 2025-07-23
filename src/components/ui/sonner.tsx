// components/ui/sonner.tsx
import React from "react";
import styled from "styled-components/native";
import Toast from "react-native-toast-message";

export const showToast = (
  type: "success" | "error",
  text1: string,
  text2?: string
) => {
  Toast.show({ type, text1, text2 });
};

export const ToastProvider: React.FC = () => (
  <StyledToastContainer>
    <Toast />
  </StyledToastContainer>
);

const StyledToastContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
