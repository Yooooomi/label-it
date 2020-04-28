const jwt = require('jsonwebtoken');
const db = require('../db');

const logged = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    const decoded = jwt.decode(token);
    const user = await db.getUser(decoded.id);
    req.user = user;
    return next();
  } catch (e) {
    return res.status(401).end();
  }
};

const validate = (schema, location = 'body') => (req, res, next) => {
  const { value, error } = schema.required().validates(req[location]);

  if (error) {
    return res.status(400).end();
  }
  req.values = value;
  return next();
};

module.exports = {
  logged,
  validate,
};
