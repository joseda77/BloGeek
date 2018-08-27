const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**Ambos arreglos guardan objetos con nombre y contenido */
var reacciones = []; 

var multimediaSchema = new Schema({
    'fileRoute':{/**Solo se tendra en cuenta si hay fotos o imagenes, de resto se  puede obviar */
        type: String /**Mirar si este tipado si lo recibe node */
    },
    'title':{
        type:String,
        required: true
    },
    'content':{/**Esto puede servir para un escrito,pensamiento,etc */
        type: String,
        required: true
    },
    'date':{
        type: Date,
        required: true
    },
    'username':{ /**Usuario al que le pertenece la publicacion */
        type: String,
        required: true
    },
    'reactions': reacciones,
    'comments': {
        type: Array
    }
},{
    versionKey: false
});

module.exports = mongoose.model('files', multimediaSchema);