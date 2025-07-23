// hooks/use-toast.ts
import { useCallback } from "react";
import { showToast } from "@/components/ui/toaster"; // ✅ ensure this points to your styled-components version

type ToastType = "success" | "error" | "info";

export function useToast() {
  const toast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      showToast(type, title, description);
    },
    []
  );

  return { toast };
}
