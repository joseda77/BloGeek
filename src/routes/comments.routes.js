const commentsController = require('../controllers/comments.controller');
const express = require('express');
const app = express.Router();

app.get("/posts/:id", commentsController.getComment);

module.exports = app;