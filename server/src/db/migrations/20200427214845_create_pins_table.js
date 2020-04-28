
exports.up = function(knex) {
  return knex.schema.createTable('pins', table => {
    table.uuid('id').primary().defaultsTo(knex.raw('uuid_generate_v4()'));
    table.uuid('label_id').references('labels.id');
    table.date('date');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pins');
};
