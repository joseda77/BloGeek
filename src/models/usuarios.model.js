const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

var archivos = [];

var usuarioSchema = new Schema({
    'username':{
        type: String,
        required: true
    },
    'email':{
        type: String,
        unique: true,
        lowercase: true
    },
    'password':{
        type:String,
        //select:false, /**Esto es para ocultar la contraseña */
        required: true
    },
    'posts':archivos
},{
    versionKey:false
});

module.exports = mongoose.model('user',usuarioSchema);