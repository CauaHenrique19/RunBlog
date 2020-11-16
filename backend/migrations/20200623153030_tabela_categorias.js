
exports.up = function(knex) {
  return knex.schema.createTable('categories', table => {
      table.increments('id').primary().notNull()
      table.string('name').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories')
};
