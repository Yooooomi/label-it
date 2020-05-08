import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import cl from 'classnames';
import s from './index.module.css';
import { getTextColorFromCSSBackground } from '../../services/color';

function getTypeFromInterval(interval) {
  if (interval.hours === 1) {
    return 'hour';
  }
  if (interval.days === 1) {
    return 'day';
  }
  if (interval.days === 7) {
    return 'week';
  }
  if (interval.months === 1) {
    return 'month';
  }
  return null;
}

function Label({
  label, onDelete, onClick, className,
}) {
  const fontColor = getTextColorFromCSSBackground(label.color);

  return (
    <button type="button" className="no-button" onClick={onClick}>
      <div className={cl(s.root, className)} style={{ background: label.color }}>
        <div style={{ color: fontColor }}>{getTypeFromInterval(label.duration)}</div>
        <div style={{ color: fontColor }}>{label.name}</div>
        {
          onDelete && (
            <IconButton onClick={onDelete}>
              <DeleteIcon style={{ color: fontColor }} />
            </IconButton>
          )
        }
      </div>
    </button>
  );
}

export default Label;
