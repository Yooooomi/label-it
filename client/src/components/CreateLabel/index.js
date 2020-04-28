import React, { useCallback, useState } from 'react';
import s from './index.module.css';
import { Input, IconButton, Select, MenuItem, FormControl } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddOutlined';
import { getRandomColor } from '../../services/color';

const timeOptions = [
  'hour',
  'day',
  'week',
  'month',
];

function CreateLabel({ onCreate }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(getRandomColor());
  const [time, setTime] = useState('day');

  const generateNewColor = useCallback(() => {
    const newColor = getRandomColor();
    setColor(newColor);
  }, []);

  const create = useCallback(ev => {
    ev.preventDefault();
    onCreate(name, color, time);
    generateNewColor();
  }, [onCreate, name, color, generateNewColor]);

  return (
    <form onSubmit={create} className={s.root}>
      <Input className={s.name} value={name} onChange={ev => setName(ev.target.value)} fullWidth placeholder="Name..." />
      <FormControl className={s.time}>
        <Select
          value={time}
          onChange={ev => setTime(ev.target.value)}
        >
          {
            timeOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <button type="button" onClick={generateNewColor} className={s.color} style={{ background: color }} />
      <IconButton type="submit">
        <AddIcon />
      </IconButton>
    </form>
  );
}

export default CreateLabel;
