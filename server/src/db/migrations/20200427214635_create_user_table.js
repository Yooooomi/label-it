
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultsTo(knex.raw('uuid_generate_v4()'));
    table.string('username').unique().index();
    table.string('password');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
