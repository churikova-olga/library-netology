const express = require('express');
const router = express.Router();
const Book = require("../models/Book");
const Comment = require("../models/Comment");
const fileMiddleware = require('../middleware/file');
const request = require('request')
const isLoggedIn = require("../middleware/auth");


router.post('/', isLoggedIn, fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), async  (req, res)=>{
    if (req.files) {

        const fileBook = req.files.fileBook[0].path;
        const fileCover = req.files.fileCover[0].path;


        const {title, description, authors, favorite, fileName} = req.body;

        const newBook = new Book({title, description, authors, favorite, fileCover, fileName, fileBook});

        try {
            await newBook.save();
            res.status(201);
            res.redirect('/book/')
        } catch (e) {
            console.error(e);
            res.status(400).json({errormessage: "Bad request"});
        }
    }
})

router.get('/create',isLoggedIn, (req, res)=>{
    res.render('book/create',{
        title: "Create",
    })
})

router.get('/',isLoggedIn,  async (req, res)=>{
    const book = await Book.find().select('-__v');
    res.render('book/index',{
        title: "Book",
        book: book,
    })
})
router.get('/update/:id',isLoggedIn, async (req, res)=> {

    const {id} = req.params;

    try {

        const book = await Book.findById({_id: id});
        res.render('book/update',{
            title: `${book.title} | update`,
            book: book,
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({errormessage: "Internal Server Error"});
    }

})

router.get('/:id', isLoggedIn, async (req,res)=>{
    const user = req.user
    const {id} = req.params;
    try {
        const book = await Book.findById({_id: id});
        const comment = await Comment.find({idBook: id})

             await request.post({
                url:  `http://library-netology_counter_1:3001/counter/${id}/incr`,
            }, (err, response, body) => {

                res.render('book/view', {
                    title: book.title,
                    book: book,
                    counter: body,
                    user: user,
                    comment: comment
                })
            })
    } catch (e) {
        console.error(e);
        res.status(404).json({errormessage: "book | not found"});
    }

})



router.post('/update/:id', isLoggedIn, fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), async (req,res)=>{

    let fileBook = ""
    let fileCover = ""


    const {id} = req.params;

    const {title, description, authors, favorite, fileName} = req.body;


    try {
        const book = await Book.findById({_id: id});
        if (req.files.length) {
            fileBook = req.files.fileBook[0].path;
            fileCover = req.files.fileCover[0].path;
        }
        else {
            fileCover = book.fileCover
            fileBook = book.fileBook
        }

        await Book.findByIdAndUpdate({_id: id} , {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        });
        res.redirect(`/book/${id}`)
    } catch (e) {
        console.error(e);
        res.status(500).json({errormessage: "Internal Server Error"});
    }

})


router.post('/:id',isLoggedIn,  async (req,res) =>{

    const {id} = req.params;
    try {
        await Book.deleteOne({_id: id});
        res.redirect('/book/')
    } catch (e) {
        console.error(e);
        res.status(500).json({errormessage: "Internal Server Error"});
    }

})

router.get('/download/:id',isLoggedIn, async (req, res) => {

    const {id} = req.params;
    const book = await Book.findById({_id: id});

    try {
        console.log(`${book.fileBook}`)
        res.download(`${book.fileBook}`, err=> {
            if (err) {
                res.status(404).json({errormessage: "file not found"});
            }
        })
    } catch (e) {
        console.error(e);
        res.status(404).json({errormessage: "book | not found"});
    }


});

module.exports = router;

