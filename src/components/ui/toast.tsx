// components/ui/toast-provider.tsx
import Toast from "react-native-toast-message";

export const showToast = (type: "success" | "error", text1: string, text2?: string) => {
  Toast.show({ type, text1, text2 });
};

export const ToastProvider = () => <Toast />;
