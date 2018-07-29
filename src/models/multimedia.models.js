const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**Ambos arreglos guardan objetos con nombre y contenido */
var comentarios = []; 
var reacciones = []; 

var multimediaSchema = new Schema({
    'archivo':{
        type: File /**Mirar si este tipado si lo recibe node */
    },
    'nombre':{
        type: String,
        required: true //Mirar si el usuario quiere nombrar o no el archivo
    },
    'fecha':{
        type: Date,
        required: true
    },
    'usuario':{ /**Usuario al que le pertenece la publicacion */
        type: String,
        required: true,
        unique: true
    },
    'reacciones': reacciones,
    'comentarios': comentarios

},{
    versionKey: false
});

module.exports = mongoose.model('files', multimediaSchema);