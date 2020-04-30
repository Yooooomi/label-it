
exports.up = async function (knex) {
  await knex.schema.createTable('labels', table => {
    table.uuid('id').primary().defaultsTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').references('users.id');
    table.string('name');
    table.string('description');
    table.string('color');
    table.specificType('duration', 'interval');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('labels');
};
