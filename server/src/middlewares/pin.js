const db = require('../db');

const withPin = (location) => async (req, res, next) => {
  const { user } = req;
  const { pinId } = req[location];

  try {
    const pin = await db.getPin(pinId, 'user');
    if (pin.user.id !== user.id) {
      return res.status(401).end();
    }
    req.pin = pin;
    return next();
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  withPin,
};
