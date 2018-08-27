const jwt = require('jwt-simple');
const moment = require('moment');
const secretToken = "02bc9dcbede51b882d0cbbbb7c0daabb";

/**Metodo que crea el token con base en un username, fecha de logueo y fecha en que expira la sesion
 */
var createToken = function(user){
    const payload = {
        sub: user.username,
        creaToken: moment().unix(),
        expireToken: moment().add(10,'days').unix()
    };
    return jwt.encode(payload,secretToken);
}

/**Metodo que desencripta el token */
var decodeToken =  function(token){
    const decode = new Promise(function(resolve, reject){
        try{
            const payload = jwt.decode(token,secretToken);
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: 'El token ha exprirado'
                });
            }
            resolve(payload.sub);
        }catch(err){
            reject({
                status: 500,
                message: 'Token invalido'
            });
        }
    });
    return decode
}

module.exports = {
   createToken, 
   secretToken,
   decodeToken 
}