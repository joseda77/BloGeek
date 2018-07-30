const cors = require('cors');
const express  = require('express');
const path = require('path');

/**Llamado a los modulos  */
const usuarioRoutes = require('./routes/usuarios.routes');
const multimediaRoutes = require('./routes/multimedia.routes');
const connectBD = require('./server/connectionDB');
const connectApp = require('./server/connectionApp');

/**Instancia de los modulos */
const app = connectApp.app;
//const server = connectApp.server;

connectBD.functionConnect();
connectApp.connectAppServer();

app.use(cors());
app.use(express.json());/***Linea super importante para que lea los json */
app.use(usuarioRoutes);
app.use(multimediaRoutes);
