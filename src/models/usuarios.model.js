const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const bcrypt = require('bcryptjs');

var usuarioSchema = new Schema({
    'username':{
        type: String,
        required: true,
        lowercase: true
    },
    'password':{
        type:String,
        select:true,//select:false, /**Esto es para ocultar la contraseña */
        required: true,
    },
    'posts':{ 
        type: Array
    }
},{
    versionKey:false
});

usuarioSchema.pre('save', function(next){
    let usuario = this;
    if(!usuario.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            return next(err);
        }else{
            bcrypt.hash(usuario.password,salt,function(err,hash){
                if (err) {
                    return next(err);
                }else{
                    usuario.password = hash;
                    next();
                }
            });
        }
    });
});

usuarioSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password,function(err,isMatch){ if (err) {
            return cb(err);
        }
        cb(null,isMatch);
    })
}

module.exports = mongoose.model('user',usuarioSchema);