import React, { useState, useCallback, useContext, useRef } from 'react';
import s from './index.module.css';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import PinsIcon from '@material-ui/icons/EventOutlined';
import LabelsIcon from '@material-ui/icons/TurnedInNotOutlined';
import urls from '../../services/urls';
import { withRouter } from 'react-router-dom';
import { ratioContext } from '../../services/context/ratio/context';

function Layout({ children, history }) {
  const [bottom, setBottom] = useState(1);
  const { setRatio } = useContext(ratioContext);

  const contentRef = useCallback(node => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();
      setRatio(rect.width / rect.height);
    }
  }, []);

  const goto = useCallback((url) => {
    history.push(url);
  }, []);

  return (
    <div className={s.root}>
      <div className={s.appcontent} ref={contentRef}>
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
