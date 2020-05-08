
exports.up = function (knex) {
  return knex.schema.createTable('global_settings', table => {
    table.uuid('id').primary().defaultsTo(knex.raw('uuid_generate_v4()'));
    table.boolean('new_registers');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('global_settings');
};
