require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('knex');
const environment = process.env.NODE_ENV;
const dbConfig = require('../knexfile.js')[environment];
const db = knex(dbConfig);
const protects = require('./middleWear.js');

//create comment
router.post('', (req, res) => {
  const { content, commenter, note_id } = req.body;

  db('comments')
    .insert({ content, commenter, note_id })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//get all comments for a note
router.get('/note/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .join('comments', 'notes.id', '=', 'comments.note_id')
    .where('notes.id', id)
    .select('content', 'commenter')
    .then(response => {
      console.log(response);
      return res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json(error);
    });
});

//update a comment
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  db('comments')
    .where({ id })
    .update({ content })
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(200).json(error);
    });
});

//delete a comment
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('comments')
    .where({ id })
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});

module.exports = router;
