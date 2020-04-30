import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import urls from './services/urls';
import { profileContext } from './services/context/profile/context';
import { readyContext } from './services/context/ready/context';
import Layout from './components/Layout';
import Login from './scenes/Account/Login';
import Register from './scenes/Account/Register';
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
        setProfile(me);
      } catch (e) {
        // User is just not logged
      } finally {
        setReady(true);
      }
    }

    fetchMe();
  }, [setProfile, setReady]);

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
