exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes_collaborators', function(tbl) {
    tbl.increments();

    tbl
      .integer('note_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('notes')
      .onDelete('CASCADE');

    tbl
      .integer('collaborator_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('collaborators')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes_collaborators');
};
