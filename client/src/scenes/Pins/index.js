import React, { useContext, useEffect, useState } from 'react';
import s from './index.module.css';
import { profileContext } from '../../services/context/profile/context';
import Calendar from '../../components/Calendar';

function Pins(props) {
  const { profile, setProfile } = useContext(profileContext);
  const [name, setName] = useState('');

  return (
    <div className={s.root}>
      <Calendar />
    </div>
  );
}

export default Pins;
