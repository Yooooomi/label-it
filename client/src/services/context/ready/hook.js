import { useState, useCallback } from 'react';

const useReady = () => {
  const [ready, setStateReady] = useState(null);

  const setReady = useCallback(rdy => {
    setStateReady(rdy);
  }, []);

  return {
    ready,
    setReady,
  };
};

export default useReady;
