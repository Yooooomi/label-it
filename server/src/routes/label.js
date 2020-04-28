const router = require('express').Router();
const Joi = require('joi');
const db = require('../db');
const { validate, logged, withLabel } = require('../middlewares');

const createLabelSchema = Joi.object().keys({
  name: Joi.string().required(),
});

router.post('/label', validate(createLabelSchema), logged, async (req, res) => {
  const { user } = req;
  const { name } = req.values;

  try {
    const newLabel = await db.addLabel(user.id, name);
    return res.status(201).send(newLabel);
  } catch (e) {
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
