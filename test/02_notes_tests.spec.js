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

  it('should cause an error on new note', done => {
    request(server)
      .post('/notes')
      .send({
        titlel: 'New Note Title',
        body: 'New Note Body',
        author: 'sam',
        user_id: 1,
        collaborators: [{ value: 1 }, { value: 2 }, { value: 3 }]
      })
      .expect(500, done);
  });

  it('should create a new note /notes', done => {
    request(server)
      .post('/notes')
      .send({
        title: 'New Note Title',
        body: 'New Note Body',
        author: 'sam',
        user_id: 1,
        collaborators: [{ value: 1 }, { value: 2 }, { value: 3 }]
      })
      .expect(201, done);
  });

  it('should get a specific note', done => {
    request(server)
      .post('/notes')
      .send({
        titlel: 'New Note Title',
        body: 'New Note Body',
        author: 'sam',
        user_id: 1,
        collaborators: [{ value: 1 }, { value: 2 }, { value: 3 }]
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
        collaborators: [{ value: 1 }, { value: 2 }, { value: 3 }]
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
      .send({
        titlel: 'New Note Title',
        body: 'New Note Body',
        author: 'sam',
        user_id: 1,
        collaborators: [{ value: 1 }, { value: 2 }, { value: 3 }]
      })
      .end((req, res) => {
        request(server)
          .put('/notes/1')
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
      .send({
        title: 'New Note Title',
        body: 'New Note Body',
        author: 'sam',
        user_id: 1,
        collaborators: [{ value: 1 }, { value: 2 }, { value: 3 }]
      })
      .end((req, res) => {
        request(server)
          .put('/notes/1')
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
      .send({
        title: 'New Note Title',
        body: 'New Note Body',
        user_id: 1,
        author: 'sam',
        collaborators: [{ value: 1 }, { value: 2 }, { value: 3 }]
      })
      .end((req, res) => {
        request(server)
          .delete('/notes/1')
          .expect(200, done);
      });
  });

  it('should get all collaborators', done => {
    request(server)
      .get('/collaborators')
      .set('Authorization', token)
      .expect(200, done);
  });
});
