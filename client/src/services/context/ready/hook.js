import { useState, useCallback } from "react"

export const useReady = () => {
  const [ready, setStateReady] = useState(null);

  const setReady = useCallback(ready => {
    setStateReady(ready);
  }, []);

  return {
    ready,
    setReady,
  };
}