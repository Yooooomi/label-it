const { Label } = require('../core/relations');

function getLabel(labelId, populate = '') {
  return Label.query().findById(labelId).withGraphFetched(populate);
}

function addLabel(userId, name, color, duration) {
  return Label.query().insert({
    user_id: userId,
    name,
    color,
    duration,
  });
}

function removeLabel(labelId) {
  return Label.query().deleteById(labelId);
}

module.exports = {
  getLabel,
  addLabel,
  removeLabel,
};
