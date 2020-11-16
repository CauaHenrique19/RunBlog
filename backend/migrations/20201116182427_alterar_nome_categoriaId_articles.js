
exports.up = function(knex) {
  return knex.raw(`
        alter table articles
            rename column "categoriaId" to categoryId`
  )
};

exports.down = function(knex) {
    return knex.raw(`
        alter table articles
            rename column categoryId to "categoriaId"`
    )
};
