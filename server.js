const express = require("express");
const helmet = require("helmet");
const server = express();
const middle = require("./middle.js");
const logger = middle.logger;
const projectRouter = require('./routes/projectRouter');
const actionRouter = require("./routes/actionsRouter");


server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('/api/projects', logger, projectRouter);
server.use('/api/actions', logger, actionRouter);

module.exports = server;