import React, { useState, useCallback } from 'react';
import { Input, Button } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import s from '../index.module.css';
import api from '../../../services/api';
import urls from '../../../services/urls';

function Register({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = useCallback(async ev => {
    ev.preventDefault();
    try {
      await api.register(username, password);
      window.success('Successfully registered onto the platform');
      history.push(urls.account.login);
    } catch (e) {
      console.error(e);
    }
  }, [username, password, history]);

  return (
    <div className={s.root}>
      <div className={s.title}>Register</div>
      <form onSubmit={onSubmit}>
        <div className={s.entry}>
          <Input fullWidth onChange={ev => setUsername(ev.target.value)} placeholder="username" />
        </div>
        <div className={s.entry}>
          <Input fullWidth onChange={ev => setPassword(ev.target.value)} placeholder="password" type="password" />
        </div>
        <div className={s.entry}>
          <Button fullWidth type="submit">Register</Button>
        </div>
        <div className={s.entry}>
          <Link to={urls.account.login}><Button color="primary" variant="text" fullWidth type="submit">Already registered, login</Button></Link>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Register);
