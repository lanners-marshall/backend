const request = require('supertest');
const server = require('../server');
const knex = require('knex');
const dbConfig = require('../knexfile.js')['test'];
const db = knex(dbConfig);

describe('Authentication', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should create a new user /users/register', done => {
    request(server)
      .post('/users/register')
      .set('Accept', 'application/json')
      .send({
        username: 'user-name',
        email: 'user-name@gmail.com',
        password: '12345'
      })
      .expect(201, done);
  });

  it('should not register if wrong info sent /users/register', done => {
    request(server)
      .post('/users/register')
      .set('Accept', 'application/json')
      .send({
        usernamee: 'user-name',
        emaill: 'user-name@gmail.com',
        password: '12345'
      })
      .expect(500, done);
  });

  it('should get all users', done => {
    request(server)
      .get('/users')
      .expect(200, done);
  });

  it('should have a succsessful signup', done => {
    request(server)
      .post('/users/register')
      .send({
        username: 'user-name',
        email: 'user-name@gmail.com',
        password: '12345'
      })
      .end((err, res) => {
        request(server)
          .post('/users/login')
          .send({
            username: 'user-name',
            password: '12345'
          })
          .expect(201, done);
      });
  });

  it('should fail on login with', done => {
    request(server)
      .post('/users/register')
      .send({
        username: 'user-name',
        email: 'user-name@gmail.com',
        password: '12345'
      })
      .end((err, res) => {
        request(server)
          .post('/users/login')
          .send({
            username: 'user-name',
            password: '1245'
          })
          .expect(401, done);
      });
  });

  it('should update a users email', done => {
    request(server)
      .post('/users/register')
      .send({
        username: 'user-name',
        email: 'user-name@gmail.com',
        password: '12345'
      })
      .end((err, res) => {
        request(server)
          .put('/users/1')
          .send({
            username: 'user-name-updated',
            email: 'user-name-updated@gmail.com'
          })
          .expect(200, done);
      });
  });

  it('should fail to update a users email', done => {
    request(server)
      .post('/users/register')
      .send({
        username: 'user-name',
        email: 'user-name@gmail.com',
        password: '12345'
      })
      .end((err, res) => {
        request(server)
          .put('/users/1')
          .send({
            usernamee: 'user-name-updated',
            emaill: 'user-name-updated@gmail.com'
          })
          .expect(500, done);
      });
  });

  it('should delete a user', done => {
    request(server)
      .post('/users/register')
      .send({
        username: 'user-name',
        email: 'user-name@gmail.com',
        password: '12345'
      })
      .end((err, res) => {
        request(server)
          .delete('/users/1')
          .expect(200, done);
      });
  });
});
