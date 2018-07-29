const usauriosController = require('../controllers/usuarios.controller');
const express = require('express');
const app = express.Router();

app.get('/find=:nombreUsuario', usauriosController.getUsuario);
app.post('/createuser',usauriosController.createUsuario);

module.exports = app;