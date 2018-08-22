const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**Ambos arreglos guardan objetos con nombre y contenido */
var comentarios = []; 
var reacciones = []; 

var multimediaSchema = new Schema({
    'rutaArchivo':{/**Solo se tendra en cuenta si hay fotos o imagenes, de resto se  puede obviar */
        type: String /**Mirar si este tipado si lo recibe node */
    },
    'contenido':{/**Esto puede servir para un escrito,pensamiento,etc */
        type: String,
        required: true
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