const router = require('express').Router();
const Joi = require('joi');
const db = require('../db');
const {
  logged, validate, withLabel, withPin,
} = require('../middlewares');

const newPinSchema = Joi.object().keys({
  labelId: Joi.string().uuid().required(),
  date: Joi.date().required(),
});

function startOfMonth(date) {
  const copy = new Date(date.getTime());
  copy.setHours(0, 0, 0, 0);
  copy.setDate(1);
  return copy;
}

function startOfWeek(date) {
  const copy = new Date(date.getTime());
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - copy.getDay() + 1);
  return copy;
}

function startOfDay(date) {
  const copy = new Date(date.getTime());
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function startOfHour(date) {
  const copy = new Date(date.getTime());
  copy.setMinutes(0);
  return copy;
}

function getStartFollowingInterval(interval, date) {
  if (interval.hours === 1) {
    return startOfHour(date);
  }
  if (interval.days === 1) {
    return startOfDay(date);
  }
  if (interval.days === 7) {
    return startOfWeek(date);
  }
  if (interval.months === 1) {
    return startOfMonth(date);
  }
  return null;
}

router.post('/pin', validate(newPinSchema), logged, withLabel('body'), async (req, res) => {
  const { label } = req;
  const { labelId, date } = req.values;

  const startOfDate = getStartFollowingInterval(label.duration, date);

  try {
    const newPin = await db.addPin(labelId, startOfDate);
    if (newPin.rowCount === 0) {
      return res.status(409).send(newPin);
    }
    return res.status(201).send(newPin);
  } catch (e) {
    return res.status(500).end();
  }
});

router.delete('/pin/:pinId', logged, withPin('params'), async (req, res) => {
  const { pin } = req;

  try {
    await db.removePin(pin.id);
    return res.status(204).end();
  } catch (e) {
    return res.status(500).end();
  }
});

module.exports = router;
