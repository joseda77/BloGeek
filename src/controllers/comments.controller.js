const commentModel = require('../models/comments.models');

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

module.exports = {
    createComment
}