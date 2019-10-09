require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('knex');
const environment = process.env.NODE_ENV;
const dbConfig = require('../knexfile.js')[environment];
const db = knex(dbConfig);
const protects = require('./middleWear.js');

//get all collaborators
router.get('', protects, (req, res) => {
  db('collaborators').then(response => {
    return res.status(200).json(response);
  });
});

module.exports = router;
