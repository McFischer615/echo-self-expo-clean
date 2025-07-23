// components/ui/toast.tsx
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
  <StyledToastWrapper>
    <Toast />
  </StyledToastWrapper>
);

const StyledToastWrapper = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
`;
