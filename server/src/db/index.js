const l = require('./actions/labels');
const u = require('./actions/user');
const p = require('./actions/pins');
const s = require('./actions/settings');

module.exports = {
  ...l,
  ...u,
  ...p,
  ...s,
};
