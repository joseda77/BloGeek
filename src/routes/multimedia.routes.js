const multimediaController = require('../controllers/multimedia.controller');
const express = require('express');
const app = express.Router();
const isAuth = require('../middlewares/auth.middleware');

app.get('/posts',multimediaController.allPost);
app.get('/my_post',isAuth,multimediaController.postPerson);
app.post('/create_post',isAuth,multimediaController.createPost);
app.put('/posts',isAuth,multimediaController.addComments);


module.exports = app;