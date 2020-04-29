import { createContext } from "react";

export const defaultValue = {
  ratio: null,
  setRatio: () => {},
};

export const ratioContext = createContext(defaultValue);
