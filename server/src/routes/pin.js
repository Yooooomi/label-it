const router = require('express').Router();
const Joi = require('joi');
const db = require('../db');
const { logged, validate, withLabel, withPin } = require('../middlewares');

const newPinSchema = Joi.object().keys({
  labelId: Joi.string().uuid().required(),
  date: Joi.date().required(),
});

router.post('/pin', validate(newPinSchema), logged, withLabel('body'), async (req, res) => {
  const { labelId, date } = req.values;

  try {
    const newPin = await db.addPin(labelId, date);
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
