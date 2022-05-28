const {Schema, model} = require('mongoose');

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    }
});


module.exports = model('User', userSchema);
