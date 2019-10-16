require('custom-env').env();
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'));
server.use(cors());

const userRoutes = require('./Routes/usersRoutes');
const notesRoutes = require('./Routes/notesRoutes');
const collaboratorsRoutes = require('./Routes/collaboratorsRoutes');
const commentsRoutes = require('./Routes/commentsRoutes');

server.use('/users', userRoutes);
server.use('/notes', notesRoutes);
server.use('/collaborators', collaboratorsRoutes);
server.use('/comments', commentsRoutes);

const port = process.env.PORT;

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => console.log('running on port 5555'));
}

module.exports = server;
