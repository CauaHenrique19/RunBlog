
exports.up = function(knex) {
  return knex.schema.createTable('articles', table => {
      table.increments('id').primary().notNull()
      table.string('title').notNull()
      table.integer('categoriaId').notNull().references('id').inTable('categories').notNull()
      table.string('imageUrl').notNull()
      table.text('content').notNull()
      table.date('createdAt').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('articles')
};
