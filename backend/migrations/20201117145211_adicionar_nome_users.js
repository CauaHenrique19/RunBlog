
exports.up = function (knex) {
    return knex.raw(`
        alter table users
            add column name varchar(255) notnull
    `)
};

exports.down = function (knex) {
    return knex.raw(`
        alter table users
            drop column name 
    `)
};
