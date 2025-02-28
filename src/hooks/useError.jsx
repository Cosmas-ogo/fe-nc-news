import { useState, useCallback } from "react";

function useError(initialError = "") {
  const [error, setError] = useState(initialError);

  const showError = useCallback((message, duration = 3000) => {
    setError(message);
    if (duration > 0) {
      setTimeout(() => {
        setError("");
      }, duration);
    }
  }, []);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  return { error, setError, clearError, showError };
}

export default useError;
