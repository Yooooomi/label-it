import React, { useCallback, useContext } from 'react';
import s from './index.module.css';
import Label from '../../components/Label';
import Title from '../../components/Title';
import api from '../../services/api';
import CreateLabel from '../../components/CreateLabel';
import { profileContext } from '../../services/context/profile/context';
import PopupMessage from '../../components/PopupMessage';

function Labels() {
  const { profile, refreshProfile } = useContext(profileContext);

  const createLabel = useCallback(async (name, color, time) => {
    try {
      await api.createLabel(name, color, time);
      await refreshProfile();
    } catch (e) {
      console.error(e);
    }
  }, [refreshProfile]);

  const onLabel = useCallback(async label => {
    try {
      const date = new Date();
      await api.createPin(label.id, date);
      window.success(
        <span>
          Labelled today with&nbsp;
          <strong>{label.name}</strong>
        </span>
      );
    } catch (e) {
      console.log(JSON.stringify(e));
      if (e.status === 409) {
        window.info(
          <span>
            Already labelled today with&nbsp;
            <strong>{label.name}</strong>
          </span>
        );
      }
      console.error(e);
    }
  }, []);

  const deleteLabel = useCallback(async (label) => {
    try {
      await api.deleteLabel(label.id);
      await refreshProfile();
    } catch (e) {
      console.error(e);
    } finally {
      window.closePopup();
    }
  }, [refreshProfile]);

  const archiveLabel = useCallback(async (label) => {
    try {
      await api.archiveLabel(label.id, true);
      await refreshProfile();
    } catch (e) {
      console.error(e);
    } finally {
      window.closePopup();
    }
  }, [refreshProfile]);

  const onDelete = useCallback(label => {
    window.popup(
      <span>
        Delete&nbsp;
        <strong>{label.name}</strong>
      </span>,
      <PopupMessage
        message="You can decide either to delete this label or archive it to hide all the pins you created with this label"
        accept="Delete"
        deny="Archive"
        onAccept={() => deleteLabel(label)}
        onDeny={() => archiveLabel(label)}
      />,
    );
  });

  return (
    <div className={s.root}>
      <Title title="Your labels" subtitle={`${profile.labels.length} total`} />
      {
        profile.labels.map(label => (
          <Label
            className={s.label}
            label={label}
            key={label.id}
            onClick={() => onLabel(label)}
            onDelete={ev => {
              ev.stopPropagation();
              ev.preventDefault();
              onDelete(label);
            }}
          />
        ))
      }
      <CreateLabel onCreate={createLabel} />
    </div>
  );
}

export default Labels;
