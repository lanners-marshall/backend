const request = require('supertest');
const server = require('../server');
const knex = require('knex');
const dbConfig = require('../knexfile.js')['test'];
const db = knex(dbConfig);

let token;

describe('notes', () => {
  beforeEach(async done => {
    await db('users').truncate();
    await db('notes').truncate();
    request(server)
      .post('/users/register')
      .send({
        username: 'user-name2',
        email: 'user-name2@gmail.com',
        password: '12345'
      })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });

  it('should get all notes', done => {
    request(server)
      .get('/notes')
      .set('Authorization', token)
      .expect(200, done);
  });

  it('should protect from viewing notes', done => {
    request(server)
      .get('/notes')
      .expect(401, done);
  });

  it('should error if wront token sent noes', done => {
    request(server)
      .get('/notes')
      .set('Authorization', 'wrong token')
      .expect(401, done);
  });

  it('should cause an error on new note', done => {
    request(server)
      .post('/notes')
      .set('Authorization', token)
      .send({
        titlel: 'New Note Title',
        body: 'New Note Body',
        user_id: 1,
        collaborators: [1, 2, 3]
      })
      .expect(500, done);
  });

  it('should create a new note /notes', done => {
    request(server)
      .post('/notes')
      .set('Authorization', token)
      .send({
        title: 'New Note Title',
        body: 'New Note Body',
        user_id: 1,
        collaborators: [1, 2, 3]
      })
      .expect(201, done);
  });

  it('should get a specific note', done => {
    request(server)
      .post('/notes')
      .set('Authorization', token)
      .send({
        titlel: 'New Note Title',
        body: 'New Note Body',
        user_id: 1,
        collaborators: [1, 2, 3]
      })
      .end((req, res) => {
        request(server)
          .get('/notes/1')
          .set('Authorization', token)
          .expect(200, done);
      });
  });

  it('should get all collaberators for a note', done => {
    request(server)
      .post('/notes')
      .set('Authorization', token)
      .send({
        titlel: 'New Note Title',
        body: 'New Note Body',
        user_id: 1,
        collaborators: [1, 2, 3]
      })
      .end((req, res) => {
        request(server)
          .get('/notes/collaborators/1')
          .set('Authorization', token)
          .expect(200, done);
      });
  });

  it('should update a note', done => {
    request(server)
      .post('/notes')
      .set('Authorization', token)
      .send({
        titlel: 'New Note Title',
        body: 'New Note Body',
        user_id: 1,
        collaborators: [1, 2, 3]
      })
      .end((req, res) => {
        request(server)
          .put('/notes/1')
          .set('Authorization', token)
          .send({
            title: 'Updated Title',
            body: 'updated body'
          })
          .expect(200, done);
      });
  });

  it('should update a note error on updating a note', done => {
    request(server)
      .post('/notes')
      .set('Authorization', token)
      .send({
        title: 'New Note Title',
        body: 'New Note Body',
        user_id: 1,
        collaborators: [1, 2, 3]
      })
      .end((req, res) => {
        request(server)
          .put('/notes/1')
          .set('Authorization', token)
          .send({
            titlee: 'Updated Title',
            bodyy: 'updated body'
          })
          .expect(500, done);
      });
  });

  it('should delete a note', done => {
    request(server)
      .post('/notes')
      .set('Authorization', token)
      .send({
        title: 'New Note Title',
        body: 'New Note Body',
        user_id: 1,
        collaborators: [1, 2, 3]
      })
      .end((req, res) => {
        request(server)
          .delete('/notes/1')
          .set('Authorization', token)
          .expect(200, done);
      });
  });
});
