const usuariosController = require('../controllers/usuarios.controller');
const express = require('express');
const app = express.Router();

app.get('/find=:nombreUsuario', usuariosController.getUsuario);
app.post('/log_in',usuariosController.login);
app.post('/sign_up',usuariosController.createUsuario);

module.exports = app;