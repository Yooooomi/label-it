import React, { useCallback } from 'react';
import cl from 'classnames';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeftOutlined';
import RightIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import s from './index.module.css';

// eslint-disable-next-line no-extend-native
Date.prototype.getRealDay = function getRealDay() {
  return (this.getDay() - 1 + 7) % 7;
};

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

function Cell({
  day, className, pins = [], labelsByKey = {}, size = 1, onClick, displayName,
}) {
  pins = pins.sort((a, b) => b.priority - a.priority);
  return (
    <button onClick={onClick} type="button" className={cl('no-button', s.cellcontainer, className)}>
      {
        pins.slice(0, 10).map((pin, idx) => (
          <div
            key={`${pin.date}`}
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

function getDaysInInterval(interval, date) {
  if (interval.hours === 1) {
    return 1;
  }
  if (interval.days === 1) {
    return 1;
  }
  if (interval.days === 7) {
    return 7;
  }
  if (interval.months === 1) {
    return getDaysInMonth(date);
  }
  return null;
}

function getPriority(interval) {
  if (interval.hours === 1) {
    return 0;
  }
  if (interval.days === 1) {
    return 1;
  }
  if (interval.days === 7) {
    return 2;
  }
  if (interval.months === 1) {
    return 3;
  }
  return null;
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
  'December',
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
  }, [date, type]);

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

  const getGridLength = useCallback(strt => {
    switch (type) {
      case 'month':
        return strt.getRealDay() > 5 ? 42 : 35;
      case 'week':
        return 7;
      case 'day':
        return 1;
      default:
        return 0;
    }
  }, [type]);

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
    let currentKey = getKeyFromDate(currDate);
    const label = labelsByKey[curr.label_id];
    const nbTimes = getDaysInInterval(label.duration, currDate);

    for (let i = 0; i < nbTimes; i += 1) {
      currentKey = getKeyFromDate(currDate);
      let current = acc[currentKey];

      if (!current) {
        current = [];
        acc[currentKey] = current;
      }
      curr.priority = getPriority(label.duration);
      current.push(curr);
      currDate.setDate(currDate.getDate() + 1);
    }
    return acc;
  }, {});

  const beforeCards = Array(daysSinceStartOfType).fill().map((_, k) => (
    <Cell
      // eslint-disable-next-line react/no-array-index-key
      key={k}
      className={cl(s.day, s.dayOtherMonth)}
      day={daysInLastMonth - daysSinceStartOfType + k + 1}
    />
  ));
  const cards = Array(daysToEnd).fill().map((_, k) => {
    const idxDay = startDayOfMonth + k;
    const thisDate = getDateFromStartAndIndex(start, k);
    return (
      <Cell
        key={idxDay + daysSinceStartOfType}
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
    <Cell
      // eslint-disable-next-line react/no-array-index-key
      key={k + 1 + daysSinceStartOfType + daysToEnd}
      className={cl(s.day, s.dayOtherMonth)}
      day={k + 1}
    />
  ));
  let dayNames = null;

  if (displayDays) {
    dayNames = DayNames.map(day => <Cell className={s.dayname} key={day} day={day} />);
  }

  const gridPattern = Math.min(beforeCards.length + cards.length + afterCards.length, 7);

  return (
    <div className={s.root}>
      <button
        type="button"
        onClick={onLeft}
        className={s.navbutton}
      >
        <LeftIcon />
      </button>
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
      <button
        type="button"
        onClick={onRight}
        className={s.navbutton}
      >
        <RightIcon />
      </button>
    </div>
  );
}

export default Calendar;
