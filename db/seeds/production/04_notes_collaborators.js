exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes_collaborators')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('notes_collaborators').insert([
        { note_id: 1, collaborator_id: 2 },
        { note_id: 1, collaborator_id: 3 },
        { note_id: 1, collaborator_id: 4 },
        { note_id: 2, collaborator_id: 5 },
        { note_id: 3, collaborator_id: 2 },
        { note_id: 3, collaborator_id: 3 }
      ]);
    });
};
