
exports.up = function(knex) {
  return knex.raw(`
    alter table likes
        alter column "createdAt" type timestamp
  `)
};

exports.down = function(knex) {
  return knex.raw(`
    alter table likes
        alter column "createdAt" type date
  `)
};
