import React, {
  useState, useCallback,
} from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import PinsIcon from '@material-ui/icons/EventOutlined';
import LabelsIcon from '@material-ui/icons/TurnedInNotOutlined';
import { withRouter } from 'react-router-dom';
import urls from '../../services/urls';
import s from './index.module.css';

function Layout({ children, history }) {
  const [bottom, setBottom] = useState(1);

  const goto = useCallback((url) => {
    history.push(url);
  }, [history]);

  return (
    <div className={s.root}>
      <div className={s.appcontent}>
        <div className={s.content}>
          {children}
        </div>
        <BottomNavigation
          value={bottom}
          onChange={(event, newValue) => {
            setBottom(newValue);
          }}
          showLabels
          className={s.footer}
        >
          <BottomNavigationAction onClick={() => goto(urls.pins)} label="Pins" icon={<PinsIcon />} />
          <BottomNavigationAction onClick={() => goto(urls.labels)} label="Labels" icon={<LabelsIcon />} />
          <BottomNavigationAction onClick={() => goto(urls.settings)} label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default withRouter(Layout);
