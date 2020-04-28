import React, { useCallback, useContext } from 'react';
import s from './index.module.css';
import { useProfile } from '../../services/context/profile/hook';
import Label from '../../components/Label';
import Title from '../../components/Title';
import api from '../../services/api';
import CreateLabel from '../../components/CreateLabel';
import { profileContext } from '../../services/context/profile/context';

function Labels() {
  const { profile, refreshProfile } = useContext(profileContext);

  const createLabel = useCallback(async (name, color, time) => {
    try {
      await api.createLabel(name, color, time);
      await refreshProfile();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onLabel = useCallback(async label => {
    try {
      await api.createPin(label.id, new Date());
    } catch (e) {
      console.error(e);
    }
  });

  const deleteLabel = useCallback(async (label) => {
    try {
      await api.deleteLabel(label.id);
      await refreshProfile();
    } catch (e) {
      console.error(e);
    }
  }, [refreshProfile]);

  return (
    <div className={s.root}>
      <Title title="Your labels" subtitle={`${profile.labels.length} total`} />
      {
        profile.labels.map(label => (
          <Label className={s.label} label={label} key={label.id} onClick={() => onLabel(label)} onDelete={() => deleteLabel(label)} />
        ))
      }
      <CreateLabel onCreate={createLabel} />
    </div>
  );
}

export default Labels;
