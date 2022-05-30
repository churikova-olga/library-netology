const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    idBook: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: "",
    },

});


module.exports = model('Comment', commentSchema);
