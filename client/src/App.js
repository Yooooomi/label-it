import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import urls from './services/urls';
import { useProfile } from './services/context/profile/hook';
import { useReady } from './services/context/ready/hook';
import { profileContext } from './services/context/profile/context';
import { readyContext } from './services/context/ready/context';
import Layout from './components/Layout';
import Login from './scenes/Account/Login';
import Register from './scenes/Account/Register';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './services/theme';
import Labels from './scenes/Labels';
import PrivateRoute from './components/PrivateRoute';
import api from './services/api';
import Pins from './scenes/Pins';

function App() {
  const { setProfile } = useContext(profileContext);
  const { setReady } = useContext(readyContext);

  useEffect(() => {
    async function fetchMe() {
      try {
        const me = await api.me();
        console.log(me);
        setProfile(me);
      } catch (e) {
      } finally {
        setReady(true);
      }
    }

    fetchMe();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Layout>
            <Switch>
              <Route exact path={urls.account.login} component={Login} />
              <Route exact path={urls.account.register} component={Register} />
              <PrivateRoute exact path={urls.pins} component={Pins} />
              <PrivateRoute exact path={urls.labels} component={Labels} />
              <PrivateRoute exact path={urls.settings} component={Labels} />
            </Switch>
          </Layout>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
