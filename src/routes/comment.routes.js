const express = require('express');
const commentController = require('../controllers/comments.controller');
const app = express.Router();

app.get('/post/comments',commentController.getComment);

module.exports = app;