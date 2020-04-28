const { Label } = require('../core/relations');

function getLabel(labelId, populate = '') {
  return Label.query().findById(labelId).withGraphFetched(populate);
}

function addLabel(userId, name, color) {
  return Label.query().insert({
    user_id: userId,
    name,
    color,
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
