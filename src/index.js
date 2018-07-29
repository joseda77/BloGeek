const express  = require('express');
const path = require('path');

/**Llamado a los modulos  */
const connectBD = require('./server/connectionDB');
const connectApp = require('./server/connectionApp');

/**Instancia de los modulos */
const app = connectApp.app;
const server = connectApp.server;

connectBD.functionConnect();
connectApp.connectAppServer();