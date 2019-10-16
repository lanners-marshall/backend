exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(tbl) {
    tbl.increments();

    tbl.string('content').notNullable();

    tbl.string('commenter').notNullable();

    tbl
      .integer('note_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('note')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
