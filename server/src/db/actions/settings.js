const { GlobalSettings } = require('../core/relations');

function getGlobalSettings() {
  return GlobalSettings.query().findOne({});
}

function createGlobalSettings() {
  return GlobalSettings.query().insert({
    new_registers: true,
  });
}

function updateGlobalSettings(modifications) {
  return GlobalSettings.query().findOne({}).patch(modifications);
}

module.exports = {
  getGlobalSettings,
  createGlobalSettings,
  updateGlobalSettings,
};
