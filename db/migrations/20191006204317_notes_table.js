exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
    tbl.increments();

    tbl
      .string('title')
      .unique()
      .notNullable();

    tbl.string('body').notNullable();

    tbl.string('author').notNullable();

    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
