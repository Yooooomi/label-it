const jwt = require('jsonwebtoken');
const db = require('../db');
const { jwtsecret } = require('../tools/jwt');

const logged = async (req, res, next) => {
  console.log(req.cookies);
  const { token } = req.cookies;

  try {
    const decoded = jwt.decode(token, jwtsecret);
    const user = await db.getUser(decoded.id, '[labels,pins]');
    req.user = user;
    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).end();
  }
};

const validate = (schema, location = 'body') => (req, res, next) => {
  const { value, error } = schema.required().validate(req[location]);

  if (error) {
    console.log(error);
    return res.status(400).end();
  }
  req.values = value;
  return next();
};

module.exports = {
  logged,
  validate,
};
