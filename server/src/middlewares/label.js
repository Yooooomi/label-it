const db = require('../db');

const withLabel = (location) => async (req, res, next) => {
  const { user } = req;
  const { labelId } = req[location];

  try {
    const label = await db.getLabel(labelId, 'user');
    if (label.user.id !== user.id) {
      return res.status(401).end();
    }
    req.label = label;
    return next();
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  withLabel,
};
