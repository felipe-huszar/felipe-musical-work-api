const express = require('express');
const server = express();
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({
    uploadDir: '/tmp/uploads',
    extended: false
}));
server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

require('../routes')(server);
require('../infrastructure/repository/mongo-repository');

module.exports = server;