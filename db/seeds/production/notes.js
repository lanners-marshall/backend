const generatorNotes = () => {
  const notes = [];
  let counter = 1;
  let name = 'Bryan';
  let user_id = 1;
  for (let i = 0; i < 100; i++) {
    let note = {
      title: `this is a custom note ${counter}`,
      body: 'this is a custom note body, its pretty cool I think',
      author: name,
      user_id: user_id
    };
    notes.push(note);
    if (counter === 10) {
      name = 'Susan';
      user_id = 2;
    } else if (counter === 20) {
      name = 'Jessica';
      user_id = 3;
    } else if (counter === 30) {
      name = 'Melvin';
      user_id = 4;
    } else if (counter === 50) {
      name = 'Roberto';
      user_id = 5;
    }
    counter++;
  }
  return notes;
};

exports.seed = async function(knex) {
  const fakeNotes = generatorNotes();
  await knex('notes').insert(fakeNotes);
};
