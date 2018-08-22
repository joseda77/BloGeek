const filesModel = require('../models/multimedia.models');

var contenido = null;
var fecha =  null;
var reacciones = [];
var comentarios = [];
var multimediaRoutes = null;
var user = null;

/**Metodo que accede a todas las publicaciones de una persona */
var postPerson = function(req, res){
    user = req.body.nombreUsuario; //Cambiar por la cabecera de la sesion req.user
    filesModel.findOne({ usuario: user},function(err, filesMod){
        if(err){
            return res.status(500).json({ errMsg: err });
        }else{
            return res.status(201).json(filesMod);
        }
    });
}

/**Metodo que accede a todas las publicaciones existentes */
var allPost = function(res){
    filesModel.find(function(err,filesMod){
        if(err){
            return res.status(500).json({ errMsg: err });
        }else{
            return res.status(201).json(filesMod);
        }
    });
}

/**Metodo que creará publicaciones */
var createPost = function(req,res){
    user = req.user;
    contenido = req.contenido;
    fecha = req.fecha;
    multimediaRoutes = req.rutaArchivo;
    if(contenido == null || fecha == null){
        return res.status(404).json({ errMsg: 'Por favor ingrese algo para continuar' });
    }else if(user == null){
        return res.status(404).json({ errMsg: 'Usted no ha iniciado sesión'});
    }

    var filesMod = new filesModel({
        rutaArchivo: multimediaRoutes,
        contenido: contenido,
        fecha: fecha,
        usuario: user
    });

    filesMod.save(function(err){
        if(err){
            return res.status(500).json({errMsg: 'Error al guardar al guardar el archivo causado por'+err})
        }else{
            return res.status(201).json(filesMod);
        }
    });    
}

/**Agrega los comentarios y reacciones al arreglo del archivo */
var addReactions = function(req,res){
    comentarios = req.comentarios; /**Recibe un objeto con usuario y contenido */
    reacciones = req.reacciones;   /**Recibe un objeto con usuario y reacciones*/

    /***Terminar el metodo */
}

module.exports = { 
    postPerson,
    allPost
}