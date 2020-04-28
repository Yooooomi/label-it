import React from 'react';
import s from './index.module.css';

function Title({ title, subtitle }) {
  return (
    <div className={s.root}>
      <div className={s.title}>{title}</div>
      {subtitle && <div className={s.subtitle}>{subtitle}</div>}
    </div>
  );
}

export default Title;
