const { User } = require('../core/relations');

function getUser(userId, populate = '') {
  return User.query().findById(userId).withGraphFetched(populate);
}

function addUser(username, password) {
  return User.query().insert({
    username,
    password,
  });
}

function getUserByUsername(username) {
  return User.query().findOne({ username });
}

module.exports = {
  getUser,
  addUser,
  getUserByUsername,
};
