const router = require('express').Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { validate, logged, withGlobalSettings } = require('../middlewares');
const { jwtsecret } = require('../tools/jwt');

const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

router.post('/login', validate(loginSchema), async (req, res) => {
  const { username, password } = req.values;

  try {
    const user = await db.getUserByUsername(username);
    if (!user) return res.status(401).end();
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).end();
    }

    const token = jwt.sign({
      id: user.id,
    }, jwtsecret);
    res.cookie('token', token);

    return res.status(200).send(req.user);
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
});

const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

router.post('/register', validate(registerSchema), withGlobalSettings, async (req, res) => {
  const { username, password } = req.values;

  if (req.globalSettings.new_registers === false) {
    return res.status(423).end();
  }

  try {
    const alreadyExisting = await db.getUserByUsername(username);

    if (alreadyExisting) {
      return res.status(409).end();
    }
    const hashedPassword = await bcrypt.hash(password, 1);
    await db.addUser(username, hashedPassword);
    return res.status(201).end();
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
});

router.get('/me', logged, async (req, res) => {
  const { user } = req;

  try {
    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).end();
  }
});

module.exports = router;
