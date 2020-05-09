const db = require('../db');

const withGlobalSettings = async (req, res, next) => {
  try {
    const settings = await db.getGlobalSettings();
    req.globalSettings = settings;
    return next();
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  withGlobalSettings,
};
