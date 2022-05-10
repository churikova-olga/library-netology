const express = require('express');
const router = express.Router();
const Book = require("../models/Book");
const fileMiddleware = require('../middleware/file');


const stor = {
    book: [],
};


router.post('/', fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]),  (req, res)=>{
    if (req.files) {
        const fileBook = req.files.fileBook[0].path;
        const fileCover = req.files.fileCover[0].path;

        const {title, description, authors, favorite, fileName} = req.body;
        console.log(req.body)
        const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
        stor.book.push(newBook);
        res.status(201);
        res.redirect('/book/')
    } else {
        res.redirect('/create')
     }
})

router.get('/create', (req, res)=>{
    res.render('book/create',{
        title: "Create",
    })
})

router.get('/', (req, res)=>{
    const {book} = stor;
    res.render('index',{
        title: "Book",
        book: book
    })
})
router.get('/update/:id', (req, res)=> {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render('book/update',{
            title: `${book[idx].title} | update`,
            book: book[idx]
        })
    } else {
        res.status(404).redirect('/404');
    }
})

router.get('/:id', (req,res)=>{
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render('book/view',{
            title: book[idx].title,
            book: book[idx]
        })
    } else {
        res.status(404).redirect('/404');
    }
})



router.post('/update/:id', fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), (req,res)=>{
    let fileBook = ""
    let fileCover = ""
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    if (req.files.length) {
        fileBook = req.files.fileBook[0].path;
        fileCover = req.files.fileCover[0].path;
    }
    else {
        fileCover = book[idx].fileCover
        fileBook = book[idx].fileBook
    }

        const {title, description, authors, favorite, fileName} = req.body;
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
            res.redirect(`/book/${id}`)
        } else {
            res.status(404).redirect('/404');
        }
})


router.post('/:id', (req,res) =>{
    const {book} = stor;
    console.log(book)
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    if (idx !== -1) {
        book.splice(idx, 1);
        res.redirect('/book/')
    } else {
        res.status(404).redirect('/404');
    }
})

router.get('/download/:id', (req, res) => {
    const {id} = req.params;
    const {book} = stor;
    const idx = book.findIndex(el => el.id === id);
    if (idx !== -1) {
        console.log(`${book[idx].fileBook}`)
        res.download(`${book[idx].fileBook}`, err=> {
            if (err) {
                res.status(404).redirect('/404');
            }
        })
    }else {
        res.status(404).redirect('/404');
    }

});

module.exports = router;

