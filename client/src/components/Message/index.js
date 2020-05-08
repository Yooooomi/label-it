import React, { useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

let uniqueId = null;

function Message() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState('warning');

  function handleClose(ev, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    window.message = (sev, msg) => {
      clearTimeout(uniqueId);
      setSeverity(sev);
      setMessage(msg);
      setOpen(true);
      uniqueId = setTimeout(handleClose, 5000);
    };
    window.success = (msg) => window.message('success', msg);
    window.info = (msg) => window.message('info', msg);
    window.warn = (msg) => window.message('warning', msg);
    window.error = (msg) => window.message('error', msg);
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
    >
      <Alert variant="filled" onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Message;
