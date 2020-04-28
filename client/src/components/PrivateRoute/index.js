import React, { useContext } from 'react';
import { profileContext } from '../../services/context/profile/context';
import { readyContext } from '../../services/context/ready/context';
import { Redirect, Route } from 'react-router-dom';
import urls from '../../services/urls';
import { CircularProgress } from '@material-ui/core';

function PrivateRoute({ ...other }) {
  const { profile } = useContext(profileContext);
  const { ready } = useContext(readyContext);

  if (!profile && ready) {
    return <Redirect to={urls.account.login} />
  }
  if (profile) {
    return <Route {...other} />
  }
  if (!ready) {
    return <CircularProgress />
  }
  return null;
}

export default PrivateRoute;
