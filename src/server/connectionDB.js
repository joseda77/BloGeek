const mongoose = require('mongoose');
const schema = mongoose.Schema;
const url = 'mongodb://joseda77:root01@ds139970.mlab.com:39970/blogeekdb';

const functionConnect = function(){
    mongoose.connect(url,{useNewUrlParser: true}, function(err){
        if(err) console.log('Error al conectar a la base de datos de BloGeek: ', err);
        else console.log('Conexion exitosa a la base de datos de BloGeek');
    });
}

module.exports = {
    functionConnect
};