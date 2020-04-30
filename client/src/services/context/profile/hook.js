import { useState, useCallback } from 'react';
import api from '../../api';

function appendLabelDict(profile) {
  profile.labelsByKey = {};
  profile.labels.forEach(label => {
    profile.labelsByKey[label.id] = label;
  });
}

const useProfile = () => {
  const [profile, setStateProfile] = useState(null);

  const setProfile = useCallback(newProfile => {
    appendLabelDict(newProfile);
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
};

export default useProfile;
