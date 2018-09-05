const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    'user':{
        type: Schema.Types.Mixed,/**Cambiar por el tipo de username */
        ref: 'user',
        required: true
    },
    'content':{
        type: String,
        required: true
    },
    'date':{
        type: Date,
        required:true
    }
},{
    versionKey: false
});

module.exports = mongoose.model('comment',commentSchema);