import React, { useCallback } from 'react';
import s from './index.module.css';
import cl from 'classnames';
import { IconButton } from '@material-ui/core';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeftOutlined';
import RightIcon from '@material-ui/icons/KeyboardArrowRightOutlined';

Date.prototype.getRealDay = function () {
  return (this.getDay() - 1 + 7) % 7;
}

function getStartOfMonth(date) {
  const copy = new Date(date.getTime());
  return (new Date(copy.getFullYear(), copy.getMonth()));
}

function getDaysInMonth(date) {
  const copy = new Date(date.getTime());
  return (new Date(copy.getFullYear(), copy.getMonth() + 1, 0)).getDate();
}

function getLastMonth(date) {
  const copy = new Date(date.getTime());
  copy.setMonth(copy.getMonth() - 1);
  return copy;
}

function getStartOfWeek(date) {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() - copy.getRealDay());
  return copy;
}

const DayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Cell({ day, className, pins = [], labelsByKey = {}, size = 1, onClick, displayName }) {
  return (
    <button onClick={onClick} type="button" className={cl('no-button', s.cellcontainer, className)} >
      {
        pins.slice(0, 10).map((pin, idx) => (
          <div
            key={`${pin.id}${idx}`}
            className={s.label}
            style={{
              height: `${10 * size}%`,
              top: `${idx * 10 + 1}%`,
              background: labelsByKey[pin.label_id].color,
            }}
          >
            {displayName && labelsByKey[pin.label_id].name}
          </div>
        ))
      }
      <div className={s.cell}>{day}</div>
    </button>
  );
}

function getKeyFromDate(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function getDateFromStartAndIndex(start, index) {
  const copy = new Date(start.getTime());
  copy.setDate(copy.getDate() + index);
  return copy;
}

function sameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate();
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function Calendar({
  displayDays,
  pins,
  labelsByKey,
  onDayClick,
  type,
  onLeft,
  onRight,
  date,
}) {
  const now = new Date();

  const getDateString = useCallback(() => {
    const copy = new Date(date.getTime());
    let base = `${months[copy.getMonth()]} ${(copy.getFullYear()).toString().padStart('0', 2)}`;

    if (type === 'day') {
      base = `${(copy.getDate()).toString().padStart('0', 2)} ${base}`;
    }
    return base;
  }, [date]);

  const getStart = useCallback(tmpdate => {
    if (type === 'month') {
      return getStartOfMonth(tmpdate);
    }
    if (type === 'week') {
      return getStartOfWeek(tmpdate);
    }
    return tmpdate;
  }, [type]);

  const start = getStart(date);

  const getGridLength = useCallback(start => {
    switch (type) {
      case 'month':
        return start.getRealDay() > 5 ? 42 : 35;
      case 'week':
        return 7;
      case 'day':
        return 1;
      default:
        return 0;
    }
  }, [type, start]);

  const getDaysSinceStartOfType = useCallback(tmpdate => {
    switch (type) {
      case 'month':
        return tmpdate.getRealDay();
      case 'week':
        return tmpdate.getRealDay();
      case 'day':
        return 0;
      default:
        return 0;
    }
  }, [type]);

  const getDaysToEndOfType = useCallback(tmpdate => {
    switch (type) {
      case 'month':
        return getDaysInMonth(tmpdate) - tmpdate.getDate() + 1;
      case 'week':
        return Math.min(7 - tmpdate.getDay() + 1, getDaysInMonth(tmpdate) - tmpdate.getDate() + 1);
      case 'day':
        return 1;
      default:
        return 0;
    }
  }, [type]);

  const daysInLastMonth = getDaysInMonth(getLastMonth(date));
  const startDayOfMonth = start.getDate();
  const daysSinceStartOfType = getDaysSinceStartOfType(start);
  const daysToEnd = getDaysToEndOfType(start);

  const sortPins = pins.reduce((acc, curr) => {
    const currDate = new Date(curr.date);
    const currentKey = getKeyFromDate(currDate);
    let current = acc[currentKey];

    if (!current) {
      current = [];
      acc[currentKey] = current;
    }

    current.push(curr);
    return acc;
  }, {});

  let beforeCards = Array(daysSinceStartOfType).fill().map((_, k) => (
    <Cell className={cl(s.day, s.dayOtherMonth)} day={daysInLastMonth - daysSinceStartOfType + k + 1} />
  ));
  let cards = Array(daysToEnd).fill().map((_, k) => {
    const idxDay = startDayOfMonth + k;
    const thisDate = getDateFromStartAndIndex(start, k);
    return (
      <Cell
        onClick={() => onDayClick(thisDate)}
        labelsByKey={labelsByKey}
        size={0.8}
        pins={sortPins[getKeyFromDate(thisDate)]}
        className={cl(s.day, sameDay(now, thisDate) && s.current)}
        day={idxDay}
        displayName={type !== 'month'}
      />
    );
  });
  const afterLength = Math.max(getGridLength(start) - (beforeCards.length + cards.length), 0);
  const afterCards = Array(afterLength).fill().map((_, k) => (
    <Cell className={cl(s.day, s.dayOtherMonth)} day={k + 1} />
  ));
  let dayNames = null;

  if (displayDays) {
    dayNames = DayNames.map(day => <Cell className={s.dayname} key={day} day={day} />)
  }

  const gridPattern = Math.min(beforeCards.length + cards.length + afterCards.length, 7);

  return (
    <div className={s.root}>
      <button onClick={onLeft} className={s.navbutton}><LeftIcon /></button>
      <div className={s.middle}>
        <div className={s.grid} style={{ gridTemplateColumns: `repeat(${gridPattern}, 1fr)` }}>
          {dayNames}
          {beforeCards}
          {cards}
          {afterCards}
        </div>
        <div className={s.footer}>
          {getDateString()}
        </div>
      </div>
      <button onClick={onRight} className={s.navbutton}><RightIcon /></button>
    </div>
  );
}

export default Calendar;
