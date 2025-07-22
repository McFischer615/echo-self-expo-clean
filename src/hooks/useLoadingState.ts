import { useState, useCallback } from "react";

export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<string | null>(null);

  /** ✅ Set loading state (resets error when starting new load) */
  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
    if (loading) setError(null);
  }, []);

  /** ✅ Set error and automatically stop loading */
  const setErrorState = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
  }, []);

  /**
   * ✅ Wrap async calls with built-in loading + error state management
   * @param asyncFn Function that returns a Promise
   * @param errorHandler Optional custom error handler (e.g., Toasts)
   */
  const withLoading = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      errorHandler?: (error: unknown) => void
    ): Promise<T | null> => {
      setLoading(true);
      try {
        const result = await asyncFn();
        setLoading(false);
        return result;
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setErrorState(message);
        if (errorHandler) errorHandler(err);
        return null;
      }
    },
    [setLoading, setErrorState]
  );

  return {
    isLoading,
    error,
    setLoading,
    setError: setErrorState,
    withLoading,
  };
};
