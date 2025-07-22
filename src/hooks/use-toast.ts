import Toast from "react-native-toast-message";

interface ToastOptions {
  type?: "success" | "error" | "info";
  title: string;
  description?: string;
  position?: "top" | "bottom";
  duration?: number; // ✅ optional auto-hide timing (default 3s)
}

export const useToast = () => {
  const toast = ({
    type = "success",
    title,
    description,
    position = "top",
    duration = 3000,
  }: ToastOptions) => {
    Toast.show({
      type,
      text1: title,
      text2: description,
      position,
      visibilityTime: duration,
      autoHide: true,
    });
  };

  const dismiss = () => {
    Toast.hide();
  };

  return { toast, dismiss };
};
