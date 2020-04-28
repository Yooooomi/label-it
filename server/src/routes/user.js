const router = require('express').Router();
const { validate, logged } = require('../middlewares');
const Joi = require('joi');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    });
    res.cookie('token', token);

    return res.status(200).send(req.user);
  } catch (e) {
    return res.status(500).end();
  }
});

const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

router.post('/register', validate(registerSchema), async (req, res) => {
  const { username, password } = req.values;

  try {
    const alreadyExisting = await db.getUserByUsername(username);

    if (alreadyExisting) {
      return res.status(409).end();
    }
    const hashedPassword = await bcrypt.hash(password);
    await db.addUser(username, hashedPassword);
    return res.status(201).end();
  } catch (e) {
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
