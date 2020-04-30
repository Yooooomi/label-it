import { createContext } from 'react';

export const defaultValue = {
  profile: null,
  setProfile: () => { },
  refreshProfile: () => { },
};

export const profileContext = createContext(defaultValue);
