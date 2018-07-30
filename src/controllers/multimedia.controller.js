const filesModel = require('../models/multimedia.models');

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
var allPost = function(req,res){
    filesModel.find(function(err,filesMod){
        if(err){
            return res.status(500).json({ errMsg: err });
        }else{
            return res.status(201).json(filesMod);
        }
    });
}

module.exports = { 
    postPerson,
    allPost
}