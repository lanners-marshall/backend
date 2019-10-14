const faker = require('faker');

exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        {
          username: 'Bryan',
          email: faker.internet.email(),
          password: faker.internet.password()
        },
        {
          username: 'Susan',
          email: faker.internet.email(),
          password: faker.internet.password()
        },
        {
          username: 'Jessica',
          email: faker.internet.email(),
          password: faker.internet.password()
        },
        {
          username: 'Melvin',
          email: faker.internet.email(),
          password: faker.internet.password()
        },
        {
          username: 'Roberto',
          email: faker.internet.email(),
          password: faker.internet.password()
        },
        {
          username: 'Terry',
          email: faker.internet.email(),
          password: faker.internet.password()
        },
        {
          username: 'Tommy',
          email: faker.internet.email(),
          password: faker.internet.password()
        }
      ]);
    });
};
