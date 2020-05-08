import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import s from './index.module.css';

function PopupMessage({
  message,
  accept,
  deny,
  onAccept,
  onDeny = window.closePopup,
}) {
  const doAccept = useCallback(() => {
    onAccept();
    window.closePopup();
  }, [onAccept]);

  return (
    <div className={s.root}>
      {message}
      <div className={s.buttons}>
        {onDeny && <div><Button variant="text" color="primary" onClick={onDeny}>{deny}</Button></div>}
        {onAccept && <div><Button variant="text" color="primary" onClick={doAccept}>{accept}</Button></div>}
      </div>
    </div>
  );
}

export default PopupMessage;
