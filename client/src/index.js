import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { profileContext } from './services/context/profile/context';
import { readyContext } from './services/context/ready/context';
import useProfile from './services/context/profile/hook';
import useReady from './services/context/ready/hook';

ReactDOM.render(
  <AppHolder />,
  document.getElementById('root'),
);

function AppHolder() {
  const profile = useProfile();
  const ready = useReady();

  return (
    <profileContext.Provider value={profile}>
      <readyContext.Provider value={ready}>
        <App />
      </readyContext.Provider>
    </profileContext.Provider>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
