import {Schema, model} from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    favorite: {
        type: String,
        default: "",
    },
    fileCover: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        default: "",
    },
    fileBook: {
        type: String,
        required: true,
    },

});


const BookModel = model('Book', bookSchema);

export {BookModel}