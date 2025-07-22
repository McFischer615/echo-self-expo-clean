import { useCallback } from "react";
import Toast from "react-native-toast-message";

interface ErrorDetails {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const useErrorHandler = () => {
  /** ✅ Handles and displays errors in a consistent mobile-friendly way */
  const handleError = useCallback(
    (error: unknown, customDetails?: ErrorDetails) => {
      console.error("Application error:", error);

      let errorMessage = "An unexpected error occurred";
      let errorTitle = "Error";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String((error as any).message);
      }

      // ✅ Map common error cases for better UX
      if (/jwt/i.test(errorMessage)) {
        errorTitle = "Authentication Error";
        errorMessage = "Please sign in again to continue";
      } else if (/network|fetch/i.test(errorMessage)) {
        errorTitle = "Connection Error";
        errorMessage = "Check your internet connection and try again";
      } else if (/timeout/i.test(errorMessage)) {
        errorTitle = "Request Timeout";
        errorMessage = "The request took too long. Please retry";
      }

      Toast.show({
        type: customDetails?.variant === "destructive" ? "error" : "info",
        text1: customDetails?.title || errorTitle,
        text2: customDetails?.description || errorMessage,
        visibilityTime: 4000,
        autoHide: true,
      });
    },
    []
  );

  /** ✅ Display success message */
  const handleSuccess = useCallback((message: string, title?: string) => {
    Toast.show({
      type: "success",
      text1: title || "Success",
      text2: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  }, []);

  return {
    handleError,
    handleSuccess,
  };
};
