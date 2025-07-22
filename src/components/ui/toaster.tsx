// components/ui/toaster.tsx
import React from "react";
import Toast from "react-native-toast-message";

export const Toaster = () => <Toast />;

export const showToast = (
  type: "success" | "error" | "info",
  title: string,
  description?: string
) => {
  Toast.show({
    type,
    text1: title,
    text2: description,
  });
};
