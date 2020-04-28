import { createContext } from "react";

export const defaultValue = {
  ready: null,
  setReady: () => {},
};

export const readyContext = createContext(defaultValue);
