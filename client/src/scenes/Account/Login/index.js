import React, { useCallback, useState } from 'react';
import s from '../index.module.css';
import { Input, Button } from '@material-ui/core';
import api from '../../../services/api';
import { withRouter, Link } from 'react-router-dom';
import urls from '../../../services/urls';
import { useProfile } from '../../../services/context/profile/hook';

function Login({ history }) {
  const { setProfile } = useProfile();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = useCallback(async ev => {
    ev.preventDefault();
    try {
      await api.login(username, password);
      const me = await api.me();
      setProfile(me);
      history.push(urls.labels);
    } catch (e) {
      console.error(e);
    }
  }, [username, password, history, setProfile]);

  return (
    <div className={s.root}>
      <div className={s.title}>Login</div>
      <form onSubmit={onSubmit}>
        <div className={s.entry}><Input fullWidth onChange={ev => setUsername(ev.target.value)} placeholder="username" /></div>
        <div className={s.entry}><Input fullWidth onChange={ev => setPassword(ev.target.value)} placeholder="password" type="password" /></div>
        <div className={s.entry}><Button fullWidth type="submit">Login</Button></div>
        <div className={s.entry}><Link to={urls.account.register}><Button variant="outlined" fullWidth type="submit">Register</Button></Link></div>
      </form>
    </div>
  );
}

export default withRouter(Login);
