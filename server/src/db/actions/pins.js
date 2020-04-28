const { Pin } = require('../core/relations');

function getPin(pinId, populate = '') {
  return Pin.query().findById(pinId).withGraphFetched(populate);
}

function addPin(labelId, date) {
  return Pin.query().insert({
    label_id: labelId,
    date,
  });
}

function removePin(pinId) {
  return Pin.query().deleteById(pinId);
}

module.exports = {
  getPin,
  addPin,
  removePin,
};
