import { useState, useCallback } from "react"
import api from "../../api";

export const useProfile = () => {
  const [profile, setStateProfile] = useState(null);

  const setProfile = useCallback(newProfile => {
    setStateProfile(newProfile);
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const user = await api.me();
      setProfile(user);
    } catch (e) {
      setProfile(null);
    }
  }, [setProfile]);

  return {
    profile,
    setProfile,
    refreshProfile,
  };
}