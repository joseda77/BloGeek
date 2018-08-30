const commentModel = require('../models/comments.models');

/**Metodo encargado de crear los comentarios y guardarlos */
var createComment = async function(content,user){    
    commentMod = new commentModel({
        user: user,
        content: content,
        date: Date.now()
    });

    try {
        let comment = await commentMod.save();
        return comment;
    } catch (err) {
        return "Error al crear comentario "+ err
    }
}


/** Metodo que retorna el comentario correspondiente a una ID */
var getComment = function(req,res){
     let id = req.body.id;
     console.log('El comentario asociado a esto es',id);
     commentModel.findById({_id: id},function(err, commentMod){
        if(err){
            return res.status(404).json({errMsg: 'Comentario no encontrado'});
        }else{
            return res.status(201).json(commentMod);
        }
     });
}

module.exports = {
    createComment,
    getComment
}