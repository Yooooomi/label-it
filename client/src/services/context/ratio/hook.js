import { useState, useCallback } from "react"

export const useRatio = () => {
  const [ratio, setStateRatio] = useState(null);

  const setRatio = useCallback(ratio => {
    setStateRatio(ratio);
  }, []);

  return {
    ratio,
    setRatio,
  };
}