const moment = require('moment');
const tokenFunction = require('../services/token.services');

/**Método que se encarga de verificar que este autenticado el usuario preguntado por el
 * token en la cabecera
 */
var isAuth = function(req, res, next){    
    if(!req.headers.authorization){
        return res.status(403).json({message: 'Usted no se ha autenticado'});
    }    
    const token = req.headers.authorization.split(' ')[1];
    tokenFunction.decodeToken(token).then(response =>{
       req.user = response;
       next(); 
    }).catch(response => {
        res.status(response.status);
    });
}

module.exports = isAuth;