const express = require('express');
const router = express.Router();
const Book = require("../../models/Book");
const fileMiddleware = require('../../middleware/file');



router.post('/', fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), async (req, res)=>{
    console.log(req.files)
    if (req.files) {

        const fileBook = req.files.fileBook[0].path;
        const fileCover = req.files.fileCover[0].path;
        console.log(fileCover)

        const {title, description, authors, favorite, fileName} = req.body;

        const newBook = new Book({title, description, authors, favorite, fileCover, fileName, fileBook});

        try {
            await newBook.save();
            res.json(newBook);
        } catch (e) {
            console.error(e);
            res.status(500).json({errormessage: "Internal Server Error"});
        }
    }
})

router.get('/', async (req, res)=>{
    const book = await Book.find().select('-__v');
    res.json(book);
})

router.get('/:id', async(req,res)=>{

    const {id} = req.params;
    try {
        const book = await Book.find(id).select('-__v');
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404).json({errormessage: "book | not found"});
    }

})

router.put('/:id',   fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), async (req,res)=>{

    let fileBook = ""
    let fileCover = ""


    const {id} = req.params;
    const book = await Book.find(id).select('-__v');

    if (req.files.length) {
        fileBook = req.files.fileBook[0].path;
        fileCover = req.files.fileCover[0].path;
    }
    else {
        fileCover = book[0].fileCover
        fileBook = book[0].fileBook
    }
        const {title, description, authors, favorite, fileName} = req.body;
    try {
        await Book.findByIdAndUpdate(id, {
                title,
                description,
                authors,
                favorite,
                fileCover,
                fileName,
                fileBook,
        });
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(500).json({errormessage: "Internal Server Error"});
    }

})

router.delete('/:id', async(req,res) =>{
    const {id} = req.params;
    try {
        const book = await Book.find(id).select('-__v');
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(500).json({errormessage: "Internal Server Error"});
    }

})

router.get('/:id/download', async (req, res) => {
    const {id} = req.params;
    const book = await Book.find(id).select('-__v');

    try {
        console.log(`${book[0].fileBook}`)
        res.download(`${book[0].fileBook}`, 'fileBook', err=> {
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