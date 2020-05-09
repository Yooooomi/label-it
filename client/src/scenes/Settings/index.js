import React, {
  useState, useContext, useCallback, useEffect,
} from 'react';
import { Button, Switch } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import s from './index.module.css';
import Title from '../../components/Title';
import { profileContext } from '../../services/context/profile/context';
import api from '../../services/api';
import urls from '../../services/urls';
import Label from '../../components/Label';
import PopupMessage from '../../components/PopupMessage';

function Settings({ history }) {
  const { profile, setProfile, refreshProfile } = useContext(profileContext);
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

  const logout = useCallback(async () => {
    try {
      await api.logout();
      setProfile(null);
      history.push(urls.account.login);
    } catch (e) {
      console.error(e);
      window.error('Failed to logout');
    }
  });

  const unarchive = useCallback(async label => {
    try {
      await api.archiveLabel(label.id, false);
      window.success(<span>
        Successfully unarchived
        <strong>{label.name}</strong>
                     </span>);
      await refreshProfile();
      window.closePopup();
    } catch (e) {
      console.error(e);
      window.error(<span>
        Could not unarchive
        <strong>
          $
          {label.name}
        </strong>
                   </span>);
    }
  }, [refreshProfile]);

  const deleteLabel = useCallback(async label => {
    try {
      await api.archiveLabel(label.id, false);
      window.success(<span>
        Successfully deleted
        <strong>{label.name}</strong>
                     </span>);
      await refreshProfile();
      window.closePopup();
    } catch (e) {
      console.error(e);
      window.error(<span>
        Could not delete
        <strong>
          $
          {label.name}
        </strong>
                   </span>);
    }
  }, [refreshProfile]);

  const onDelete = useCallback(label => {
    window.popup(
      `Manage ${label.name}`,
      <PopupMessage
        message="Do you want to unarchive this label or delete it forever?"
        accept="Unarchive"
        deny="Delete"
        onAccept={() => unarchive(label)}
        onDeny={() => deleteLabel(label)}
      />,
    );
  }, [unarchive, deleteLabel]);

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
        <Button fullWidth onClick={logout}>Logout</Button>
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
        <div>
          <Title
            title="Archived labels"
            subtitle="List of all your archived labels"
          />
          {
            profile.archivedLabels.length > 0 ? (
              profile.archivedLabels.map(label => (
                <Label key={label.id} label={label} onDelete={() => onDelete(label)} />
              ))
            ) : (
              <p>You have no archived labels</p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default withRouter(Settings);
