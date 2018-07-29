const usuariosController = require('../controllers/usuarios.controller');
const express = require('express');
const app = express.Router();

app.get('/find=:nombreUsuario', usuariosController.getUsuario);
app.post('/login',usuariosController.login);
app.post('/createuser',usuariosController.createUsuario);

module.exports = app;