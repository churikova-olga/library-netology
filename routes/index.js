const express = require('express');
const router = express.Router();
const Book = require("../models/Book");
const fileMiddleware = require('../middleware/file');


const stor = {
    book: [],

};

router.post('/', fileMiddleware.single('fileBook'), (req, res)=>{
    if (req.file) {
        const {path} = req.file;
        const {title, description, authors, favorite, fileCover, fileName} = req.body;
        console.log(req.body)
        const newBook = new Book(title, description, authors, favorite, fileCover, fileName, path);
        stor.book.push(newBook);
        res.status(201);
        res.json(newBook);
    } else {
        res.json(null);
    }
})

router.get('/', (req, res)=>{
    const {book} = stor;
    res.json(book);
})

router.get('/:id', (req,res)=>{
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("todo | not found");
    }
})

router.put('/:id',  fileMiddleware.single('fileBook'), (req,res)=>{
    if (req.file) {
        const {path} = req.file;
        const {book} = stor;
        const {id} = req.params;
        const idx = book.findIndex(el => el.id === id);
        const fileBook = path;
        const {title, description, authors, favorite, fileCover, fileName} = req.body;
        if (idx !== -1) {
            book[idx] = {
                ...book[idx],
                title,
                description,
                authors,
                favorite,
                fileCover,
                fileName,
                fileBook,
            }
            res.json(book[idx]);
        } else {
            res.status(404);
            res.json("todo | not found");
        }
    }
})

router.delete('/:id', (req,res) =>{
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    if (idx !== -1) {
        book.splice(idx, 1);
        res.json('OK');
    } else {
        res.status(404);
        res.json("book | not found");
    }
})

router.get('/:id/download', (req, res) => {
    const {id} = req.params;
    const {book} = stor;
    const idx = book.findIndex(el => el.id === id);
    if (idx !== -1) {
        console.log(`${book[idx].fileBook}`)
    res.download(`${book[idx].fileBook}`, 'fileBook', err=> {

        if (err) {
            res.status(404).json();
        }
    })}else {
            res.status(404);
            res.json("book | not found");
    }

});

module.exports = router;