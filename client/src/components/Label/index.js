import React from 'react';
import s from './index.module.css';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import cl from 'classnames';
import { getTextColorFromCSSBackground } from '../../services/color';

function Label({ label, onDelete, onClick, className }) {
  const fontColor = getTextColorFromCSSBackground(label.color);

  return (
    <div onClick={onClick} className={cl(s.root, className)} style={{ background: label.color }}>
      <div style={{ color: fontColor }}>{label.time || 'day'}</div>
      <div style={{ color: fontColor }}>{label.name}</div>
      {
        onDelete && (
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        )
      }
    </div>
  );
}

export default Label;
