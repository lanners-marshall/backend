const request = require('supertest');
const server = require('../server');
const knex = require('knex');
const dbConfig = require('../knexfile.js')['test'];
const db = knex(dbConfig);

describe('notes', () => {
  beforeEach(async done => {
    await db('notes').truncate();
    await db('comments').truncate();
    request(server)
      .post('/notes')
      .send({
        titlel: 'New Note Title',
        body: 'New Note Body',
        author: 'sam',
        user_id: 1,
        collaborators: [{ value: 1 }, { value: 2 }, { value: 3 }]
      })
      .end(() => {
        done();
      });
  });

  it('should create a new comment /comments', done => {
    request(server)
      .post('/comments')
      .send({
        content: 'I am a test comment',
        commenter: 'sam',
        note_id: 1
      })
      .expect(201, done);
  });

  it('should cause an error on comment create /comments', done => {
    request(server)
      .post('/comments')
      .send({
        contentt: 'I am a test comment',
        commenterr: 'sam',
        note_id: 1
      })
      .expect(500, done);
  });

  it('should update a comment /comments', done => {
    request(server)
      .post('/comments')
      .send({
        content: 'I am a test comment',
        commenter: 'sam',
        note_id: 1
      })
      .end(() => {
        request(server)
          .put('/comments/1')
          .send({
            content: 'I am a test comment',
            commenter: 'sam',
            note_id: 1
          })
          .expect(200, done);
      });
  });

  it('should error on updating a comment /comments', done => {
    request(server)
      .post('/comments')
      .send({
        content: 'I am a test comment',
        commenter: 'sam',
        note_id: 1
      })
      .end(() => {
        request(server)
          .put('/comments/1')
          .send({
            contentt: 'I am a test comment',
            commenterr: 'sam',
            note_id: 1
          })
          .expect(500, done);
      });
  });

  it('should delete a comment', done => {
    request(server)
      .post('/comments')
      .send({
        content: 'I am a test comment',
        commenter: 'sam',
        note_id: 1
      })
      .end(() => {
        request(server)
          .delete('/comments/1')
          .expect(200, done);
      });
  });

  it('should get all comments for a note /comments/note/:id', done => {
    request(server)
      .post('/comments')
      .send({
        content: 'I am a test comment',
        commenter: 'sam',
        note_id: 1
      })
      .end(() => {
        request(server)
          .get('/comments/note/1')
          .expect(200, done);
      });
  });
});
