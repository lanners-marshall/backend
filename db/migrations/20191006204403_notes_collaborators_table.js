exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes_collaborators', function(tbl) {
    tbl.increments();

    tbl
      .integer('note_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('notes');

    tbl
      .integer('collaborator_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('collaborators');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes_collaborators');
};
