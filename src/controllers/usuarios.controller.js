const usuariosModel = require('../models/usuarios.model');

/** Metodo que busca usuarios*/
var getUsuario = function(req, res){
    nombreUser = req.params.nombreUsuario;
    if(nombreUser == ''){
        return res.status(500).json({ errMsg: 'No se ha ingresado ningun caracter'});
    }
    usuariosModel.find({ nombreUsuario: nombreUser}, function(err, usuariosMod){
        if(err){
            return res.status(404).json({ errMsg: err});
        } else {
            return res.status(200).json(usuariosMod);
        }
    });
}

/**Metodo que crea el usuario */
var createUsuario = function(req,res){
    user = req.body.nombreUsuario;
    contra = req.body.password;
    correo = req.body.email;

    if(user =='' || contra == '' || correo==''){
        return res.status(404).json({errMsg: 'Por favor complete los campos necesarios'});
    }

    var usuariosMod = new usuariosModel({
        nombreUsuario: user,
        email: correo,
        password: contra,
        publicaciones: []
    });

    usuariosMod.save(function(err){
        if(err){
            return res.status(500).json({errMsg: err});
        }else{
            return res.status(201).json(usuariosMod);
        }
    });
}

/**Metodo para la autenticacion o login */
var login = function(req, res){
    correo = req.body.email;
    pass = req.body.password;
    if(correo == null || pass == null){
        return res.status(404).json({ Message: 'Usuario o Contraseña invalida' });
    }
    usuariosModel.findOne({ email:correo }, function(err, usuariosMod){
        if(err){
            return res.status(404).json({ errMsg: err });
        }else if(!usuariosMod){
            return res.status(404).json({ Message: 'El correo no esta asociado a una cuenta' });
        }else{
            if(usuariosMod.password !== pass){                
                return res.status(404).json({ Message: 'Contraseña invalida' });
            }else{
                return res.status(201).json({ Message: 'Usuario logueado' });
            }
        }
    });
}

module.exports = {
    getUsuario,
    createUsuario,
    login
}