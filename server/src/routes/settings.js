const router = require('express').Router();
const Joi = require('joi');
const db = require('../db');
const { validate, logged } = require('../middlewares');

// const updateSettingsSchema = Joi.object().keys({
// });

// router.patch('/settings', validate(), logged, async (req, res) => {
//   try {
//     await db.updateSettings();
//   } catch (e) {
//     console.error(e);
//     return res.status(500).end();
//   }
// });

router.get('/global_settings', logged, async (req, res) => {
  try {
    const settings = await db.getGlobalSettings();
    return res.status(200).send(settings);
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});

const updateGlobalSettingsSchema = Joi.object().keys({
  newRegisters: Joi.boolean().default(null),
});

router.put('/global_settings', validate(updateGlobalSettingsSchema), logged, async (req, res) => {
  const { values } = req;

  const modifications = {};

  if (values.newRegisters != null) {
    modifications.new_registers = values.newRegisters;
  }

  if (Object.keys(modifications).length === 0) {
    return res.status(400).end();
  }

  try {
    await db.updateGlobalSettings(modifications);
    return res.status(204).end();
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});

module.exports = router;
