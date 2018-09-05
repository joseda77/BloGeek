const filesModel = require('../models/multimedia.models');
const commentsController = require('./comments.controller');

var contenido = null;
var fecha =  null;
var multimediaRoutes = null;
var user = null;

/**Metodo que accede a todas la publicaciones que el usuario logueado ha hecho*/
var postPerson = function(req, res){
    user = req.user;    
    if (user == null || user == "") {
        return res.status(400).json({ errMsg: 'Usted no ha iniciado sesión' })
    }
    filesModel.findOne({ username: user},function(err, filesMod){
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

/**Metodo que creará publicaciones */
var createPost = function(req,res){
    user = req.body.username;
    titulo = req.body.title;
    contenido = req.body.content;
    fecha = Date.now();
    multimediaRoutes = req.body.fileRoute;

    if (titulo == null || titulo == "") {
        return res.status(400).json({ errMsg: "El titulo no tiene contenido" });
    }
    if (user == null || user == "") {
        return res.status(400).json({ errMsg: 'Usted no ha iniciado sesión' })
    }
    if (contenido === undefined ||contenido == "") {
        return res.status(400).json({ errMsg: 'El body no tiene contenido' })
    }
    if(contenido == null || fecha == null){
        return res.status(404).json({ errMsg: 'Por favor ingrese algo para continuar' });
    }else if(user == null){
        return res.status(404).json({ errMsg: 'Usted no ha iniciado sesión'});
    }

    var filesMod = new filesModel({
        fileRoute: multimediaRoutes,
        content: contenido,
        date: fecha,
        title: titulo,
        username: user
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
var addComments = async function(req,res){
    comentarios = req.body.comments; /**Recibe un objeto con usuario y contenido */
    reacciones = req.body.reactions;   /**Recibe un objeto con usuario y reacciones*/
    user = req.user;
    post = req.body.post; 
    if(comentarios == null || comentarios==""){
        return res.status(400).json({errMsg: "El comentario no tiene contenido"});
    }
    if(user == null || user==""){
        return res.status(400).json({errMsg: 'Usted no ha iniciado sesión'})
    }
    if(post === undefined || post == ""){
        return res.status(400).json({errMsg: 'Este comentario no fue asignado a ningun post'})
    }
    let comment = await commentsController.createComment(comentarios,user);
    filesModel.findById(post, function(err,filesMod){
        filesMod.comments.push(comment._id);
        filesMod.save(function(err){
            if (err) {
                return res.status(500).json({ errMsg: "Error al actualizar el post" + err });
            } else {
                return res.status(201).json(comment);
            }
        })        
    });
   /*Terminar este metodo, solo falta que retorne los objetos como tal*/
}

module.exports = { 
    postPerson,
    allPost,
    createPost,
    addComments
}