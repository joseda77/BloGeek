const multimediaController = require('../controllers/multimedia.controller');
const express = require('express');
const app = express.Router();

app.get('/news',multimediaController.allPost);
app.post('/searchUser',multimediaController.postPerson);

module.exports = app;