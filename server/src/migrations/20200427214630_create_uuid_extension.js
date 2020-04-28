
exports.up = function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
};

exports.down = function(knex) {
  return knex.raw('DELETE EXTENSION IF EXISTS "uuid-ossp"');
};
