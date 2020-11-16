
exports.up = function(knex) {
  return knex.schema.createTable('likes', table => {
      table.increments('id').primary().notNull()
      table.integer('userId').notNull().references('id').inTable('users').notNull()
      table.integer('articleId').notNull().references('id').inTable('articles').notNull()
      table.date('createdAt').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('likes')
};
