const multimediaController = require('../controllers/multimedia.controller');
const express = require('express');
const app = express.Router();

app.get('/posts',multimediaController.allPost);
app.post('/searchUser',multimediaController.postPerson);
app.post('/createpost',multimediaController.createPost);

module.exports = app;