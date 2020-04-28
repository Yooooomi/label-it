import React from 'react';
import s from './index.module.css';

function daysInMonth(date) {
  const copy = new Date(date.getTime());
  return (new Date(copy.getFullYear(), copy.getMonth() + 1, 0)).getDate();
}

function Calendar(props) {
  const date = new Date();
  const days = daysInMonth(date);

  const cards = Array.keys(new Array(days)).map(day => (
    <div className={s.day}>{day + 1}</div>
  ))

  return (
    <div className={s.root}>
      {cards}
    </div>
  );
}

export default Calendar;
