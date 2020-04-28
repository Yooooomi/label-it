const l = require('./actions/labels');
const u = require('./actions/user');
const p = require('./actions/pins');

module.exports = {
  ...l,
  ...u,
  ...p,
};
