import React, {
  useContext, useState, useCallback,
} from 'react';
import { Tabs, Tab } from '@material-ui/core';
import s from './index.module.css';
import { profileContext } from '../../services/context/profile/context';
import Calendar from '../../components/Calendar';
import Title from '../../components/Title';

const TimeTypes = [
  'month',
  'week',
  'day',
];

function addDay(date, mult) {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() + 1 * mult);
  return copy;
}

function addWeek(date, mult) {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() + 7 * mult);
  return copy;
}

function addMonth(date, mult) {
  const copy = new Date(date.getTime());
  copy.setMonth(copy.getMonth() + 1 * mult);
  return copy;
}

function Pins() {
  const { profile } = useContext(profileContext);
  const [time, setTime] = useState(0);
  const [specificDate, setSpecificDate] = useState(new Date());

  const dayClick = useCallback(day => {
    setSpecificDate(day);
    setTime(2);
  }, []);

  const changeTimeType = useCallback(value => {
    setTime(value);
    setSpecificDate(new Date());
  }, []);

  const onNav = useCallback((mult) => {
    if (time === 0) {
      setSpecificDate(addMonth(specificDate, mult));
    } else if (time === 1) {
      setSpecificDate(addWeek(specificDate, mult));
    } else if (time === 2) {
      setSpecificDate(addDay(specificDate, mult));
    }
  }, [time, specificDate]);

  const onLeft = useCallback(() => {
    onNav(-1);
  }, [onNav]);

  const onRight = useCallback(() => {
    onNav(1);
  }, [onNav]);

  return (
    <div className={s.root}>
      <Title
        title="Your calendar"
      />
      <Calendar
        onDayClick={dayClick}
        date={specificDate}
        type={TimeTypes[time]}
        labelsByKey={profile.labelsByKey}
        pins={profile.pins}
        onLeft={onLeft}
        onRight={onRight}
      />
      <Tabs className={s.tabs} value={time} onChange={(_, value) => changeTimeType(value)}>
        {
          TimeTypes.map(type => (
            <Tab key={type} className={s.tab} label={type} />
          ))
        }
      </Tabs>
    </div>
  );
}

export default Pins;
