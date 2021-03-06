const jwt = require('jsonwebtoken');
const db = require('../db');
const { jwtsecret } = require('../tools/jwt');

const logged = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).end();
    }
    const decoded = jwt.decode(token, jwtsecret);
    if (!decoded) {
      return res.status(401).end();
    }
    const user = await db.getUser(decoded.id, '[labels,pins]');
    const labels = user.labels.reduce((acc, curr) => {
      if (curr.archived) {
        acc.archived.push(curr);
      } else {
        acc.notArchived.push(curr);
      }
      return acc;
    }, { archived: [], notArchived: [] });
    delete user.archived;
    user.labels = labels.notArchived;
    user.archivedLabels = labels.archived;
    req.user = user;
    return next();
  } catch (e) {
    console.error(e);
    return res.status(401).end();
  }
};

const validate = (schema, location = 'body') => (req, res, next) => {
  const { value, error } = schema.required().validate(req[location]);

  if (error) {
    console.error(error);
    return res.status(400).end();
  }
  req.values = value;
  return next();
};

module.exports = {
  logged,
  validate,
};
