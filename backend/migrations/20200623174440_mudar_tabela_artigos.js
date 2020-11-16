const { table } = require("../src/database/connection");

exports.up = function(knex) {
  return knex.raw(`
    alter table articles
        alter column "createdAt" type timestamp
  `)
};

exports.down = function(knex) {
return knex.raw(`
    alter table articles
        alter column "createdAt" type date
  `)
};
