exports.up = function(knex, Promise) {
  return knex.schema.createTable('collaborators', function(tbl) {
    tbl.increments();

    tbl.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('collaborators');
};
