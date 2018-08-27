const usuariosModel = require('../models/usuarios.model');
const tokenFunctions = require('../services/token.services');

/** Metodo que busca usuarios*/
var getUsuario = function(req, res){
    
    nombreUser = req.params.username;
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
    user = req.body.username;
    contra = req.body.password;
    correo = req.body.email;
    if(user =='' || contra == '' || correo==''){
        return res.status(404).json({errMsg: 'Por favor complete los campos necesarios'});
    }

    var usuariosMod = new usuariosModel({
        username: user,
        email: correo,
        password: contra,
        publications: []
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
    username = req.body.username;
    pass = req.body.password;
    if(username == null || pass == null){
        return res.status(404).json({ Message: 'Usuario o Contraseña invalida' });
    }
    usuariosModel.findOne({ username: username  }, function(err, usuariosMod){
        if(err){
            return res.status(404).json({ errMsg: err });
        }else if(!usuariosMod){
            return res.status(404).json({ Message: 'El correo no esta asociado a una cuenta' });
        }else{
            console.log(pass);/**--------------------------------------------------------------------- */
            usuariosMod.comparePassword(pass, function(err,isMatch){
                if (err) {
                    return res.status(500).json({errMsg: 'Ha ocurrido un erro inesperado '+err});
                }
                if (isMatch === false) {
                    return res.status(400).json({ errMsg: 'Contraseña incorrecta'});
                } else {
                    console.log("El usaurio mod es", usuariosMod);/**-------------------------------------- */
                    var token = tokenFunctions.createToken(usuariosMod);
                    return res.status(200).json({
                        Message: 'Sesión iniciada correctamente',
                        token: token
                    });
                }
            });            
        }
    });
}

module.exports = {
    getUsuario,
    createUsuario,
    login
}