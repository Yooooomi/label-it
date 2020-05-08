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

function archiveLabel(labelId, status) {
  return Label.query().findById(labelId).patch({
    archived: status,
  });
}

module.exports = {
  getLabel,
  addLabel,
  removeLabel,
  archiveLabel,
};
