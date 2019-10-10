require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('knex');
const environment = process.env.NODE_ENV;
const dbConfig = require('../knexfile.js')[environment];
const db = knex(dbConfig);
const protects = require('./middleWear.js');

//create a note
router.post('', (req, res) => {
  const { title, body, user_id, collaborators, author } = req.body;
  db('notes')
    .insert({ title, body, user_id, author })
    .then(async () => {
      const response = await db('notes').where({
        title,
        body,
        user_id,
        author
      });

      console.log(response);
      const notes_collaborators = [];
      for (let i = 0; i < collaborators.length; i++) {
        notes_collaborators.push({
          note_id: id,
          collaborator_id: collaborators[i].value
        });
      }
      console.log(notes_collaborators);
      return db('notes_collaborators').insert(notes_collaborators);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json(error);
    });
});

//get all notes
router.get('', protects, (req, res) => {
  db('notes').then(response => {
    return res.status(200).json(response);
  });
});

//get a note
router.get('/:id', protects, (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id })
    .then(response => {
      return res.status(200).json(response);
    });
});

//get a note and its collaborators
router.get('/collaborators/:id', protects, (req, res) => {
  const { id } = req.params;

  db('notes')
    .join('notes_collaborators', 'notes_collaborators.note_id', '=', 'notes.id')
    .join(
      'collaborators',
      'collaborators.id',
      '=',
      'notes_collaborators.collaborator_id'
    )
    .where('notes.id', id)
    .then(response => {
      return res.status(200).json(response);
    });
});

//update a note
router.put('/:id', (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;

  db('notes')
    .where({ id })
    .update({ title, body })
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});

//delete a note
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id })
    .del()
    .then(response => {
      return res.status(200).json(response);
    });
});

module.exports = router;
