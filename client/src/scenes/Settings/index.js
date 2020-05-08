import React, { useState, useContext, useCallback, useEffect } from 'react';
import s from './index.module.css';
import Title from '../../components/Title';
import { Button, Switch } from '@material-ui/core';
import { profileContext } from '../../services/context/profile/context';
import api from '../../services/api';

function Settings() {
  const [newRegisters, setNewRegisters] = useState(null);

  useEffect(() => {
    async function fetchGlobal() {
      try {
        const settings = await api.getGlobalSettings();
        setNewRegisters(settings.new_registers);
      } catch (e) {
        window.error('Could not load global settings');
      }
    }

    fetchGlobal();
  }, []);

  const onNewRegister = useCallback(async () => {
    try {
      setNewRegisters(!newRegisters);
      await api.setGlobalSettings(!newRegisters);
      window.success('Updated your settings');
    } catch (e) {
      window.error('There was an issue updating your settings');
    }
  }, [newRegisters]);

  if (newRegisters === null) {
    return null;
  }

  return (
    <div className={s.root}>
      <Title
        title="Settings"
        subtitle="Various settings about the App"
      />
      <div>
        <Button fullWidth>Logout</Button>
        <div className={s.line}>
          <div className={s.first}>
            Disable new registrations
          </div>
          <Switch
            color="primary"
            className={s.second}
            checked={newRegisters}
            onClick={onNewRegister}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
