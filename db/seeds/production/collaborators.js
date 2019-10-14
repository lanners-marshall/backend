exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('collaborators')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('collaborators').insert([
        { name: 'Bryan' },
        { name: 'Susan' },
        { name: 'Jessica' },
        { name: 'Melvin' },
        { name: 'Roberto' },
        { name: 'Terry' },
        { name: 'Tommy' }
      ]);
    });
};
