require('dotenv').config();
const secret = process.env.DB_PASS;
const jwt_id = process.env.DB_HOST;
const express = require('express');
const router = express.Router();
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const environment = process.env.NODE_ENV;
const dbConfig = require('../knexfile.js')[environment];
const db = knex(dbConfig);
const protects = require('./middleWear.js');

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '4h',
    jwtid: jwt_id
  };
  return jwt.sign(payload, secret, options);
}

// get all users
router.get('', (req, res) => {
  db('users').then(response => {
    return res.status(200).json(response);
  });
});

// create a new user
router.post('/register', (req, res) => {
  let { username, email, password } = req.body;
  password = bcrypt.hashSync(password, 13);

  db('users')
    .insert({ username, email, password })
    .then(ids => {
      db('users')
        .where({ username, email, password })
        .first()
        .then(user => {
          const token = generateToken(user);
          const user_info = { token, id: user.id, name: user.username };
          db('collaborators')
            .insert({ name: username })
            .then(() => {
              return res.status(201).json(user_info);
            });
        });
    })
    .catch(err => {
      res.status(500).json({ msg: 'there was an error registering user' });
    });
});

// -----Create-----
// creat a new user session
router.post('/login', (req, res) => {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(201).json({ token, id: user.id, name: user.username });
      } else {
        res
          .status(401)
          .json({ msg: 'incorrect username/password combination' });
      }
    });
});

//update a users name/email
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  db('users')
    .where({ id })
    .update({ username, email })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//delete a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('users')
    .where({ id })
    .del()
    .then(() => {
      db('collaborators')
        .where({ id })
        .del()
        .then(response => {
          return res.status(200).json(response);
        });
    });
});

module.exports = router;
