exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('comments').insert([
        {
          content: 'some comment content here',
          commenter: 'Bryan',
          note_id: 1
        },
        {
          content: 'some comment content here',
          commenter: 'Bryan',
          note_id: 1
        },
        {
          content: 'some comment content here',
          commenter: 'Bryan',
          note_id: 1
        },
        {
          content: 'some comment content here',
          commenter: 'Bryan',
          note_id: 2
        },
        {
          content: 'some comment content here',
          commenter: 'Bryan',
          note_id: 2
        },
        {
          content: 'some comment content here',
          commenter: 'Bryan',
          note_id: 2
        },
        {
          content: 'some comment content here',
          commenter: 'Bryan',
          note_id: 3
        }
      ]);
    });
};
