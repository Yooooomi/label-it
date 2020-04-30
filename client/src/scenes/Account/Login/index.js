import React, { useCallback, useState, useContext } from 'react';
import { Input, Button } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import s from '../index.module.css';
import api from '../../../services/api';
import urls from '../../../services/urls';
import { profileContext } from '../../../services/context/profile/context';

function Login({ history }) {
  const { setProfile } = useContext(profileContext);
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
