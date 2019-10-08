require('custom-env').env();
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const knex = require('knex');

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'));
server.use(cors());

const userRoutes = require('./Routes/usersRoutes');
const notesRoutes = require('./Routes/notesRoutes');

server.use('/users', userRoutes);
server.use('/notes', notesRoutes);

if (process.env.NODE_ENV !== 'test') {
  server.listen(5555, () => console.log('running on port 5555'));
}

module.exports = server;
