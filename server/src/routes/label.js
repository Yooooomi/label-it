const router = require('express').Router();
const Joi = require('joi');
const db = require('../db');
const { validate, logged, withLabel } = require('../middlewares');

const createLabelSchema = Joi.object().keys({
  name: Joi.string().required(),
  color: Joi.string().length(7).required(),
  time: Joi.only(['hour', 'day', 'week', 'month']).required(),
});

const TimeToInterval = {
  hour: '1 hour',
  day: '1 day',
  week: '1 week',
  month: '1 month',
};

router.post('/label', validate(createLabelSchema), logged, async (req, res) => {
  const { user } = req;
  const { name, color, time } = req.values;

  try {
    const newLabel = await db.addLabel(user.id, name, color, TimeToInterval[time]);
    return res.status(201).send(newLabel);
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
});

router.delete('/label/:labelId', logged, withLabel('params'), async (req, res) => {
  const { label } = req;

  try {
    await db.removeLabel(label.id);
    return res.status(204).end();
  } catch (e) {
    return res.status(500).end();
  }
});

module.exports = router;
