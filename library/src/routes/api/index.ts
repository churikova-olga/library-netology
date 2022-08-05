import express from 'express';
import {Request, Response} from 'express'

import {fileMiddleware} from '../../middleware/file';
import {container} from "../../infra/container";
import {BooksRepository} from "../../infra/BooksRepository";


const router = express.Router();

router.post('/', fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), async (req: Request, res: Response)=>{
    const repo = container.get(BooksRepository);
    if (req.files) {
        const files = req.files as  {[fieldname: string]: Express.Multer.File[]};
        const fileBook  = files['fileBook'][0].path;
        const fileCover = files['fileCover'][0].path;


        const {title, description, authors, favorite, fileName} = req.body;
        try {
            const newBook = await repo.createBook({title, description, authors, favorite, fileCover, fileName, fileBook});
            res.status(201);
            res.json(newBook);
        } catch (e) {
            console.error(e);
            res.status(500).json({errormessage: "Internal Server Error"});
        }
    }
})

router.get('/', async (req, res)=>{
    const repo: BooksRepository = container.get(BooksRepository);
    const books = await repo.getBooks()
    res.json(books);
})

router.get('/:id', async(req,res)=>{
    const repo: BooksRepository = container.get(BooksRepository);
    const {id} = req.params;
    try {
        const book = await repo.getBook(id)
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404).json({errormessage: "book | not found"});
    }

})

router.put('/:id',   fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), async (req,res)=>{

    let fileBook = ""
    let fileCover = ""

    const repo: BooksRepository = container.get(BooksRepository);
    const {id} = req.params;

    const {title, description, authors, favorite, fileName} = req.body;


    try {
        const book = await repo.getBook(id)
        if (req.files.length) {
            const files = req.files as {[fieldname: string]: Express.Multer.File[]};
            fileBook = files['fileBook'][0].path;
            fileCover = files['fileCover'][0].path;

        }
        else {
            fileCover = book.fileCover
            fileBook = book.fileBook
        }

        await repo.updateBook(id, {
                title,
                description,
                authors,
                favorite,
                fileCover,
                fileName,
                fileBook,
        });
        res.redirect(`/api/book/${id}`);
    } catch (e) {
        console.error(e);
        res.status(500).json({errormessage: "Internal Server Error"});
    }

})

router.delete('/:id', async(req,res) =>{
    const {id} = req.params;
    const repo: BooksRepository = container.get(BooksRepository);

    try {
        await repo.deleteBook(id);
        res.json(true);
    } catch (e) {
        console.error(e);
        res.status(500).json({errormessage: "Internal Server Error"});
    }

})

router.get('/:id/download', async (req, res) => {
    const {id} = req.params;
    const repo: BooksRepository = container.get(BooksRepository);
    const book = await repo.getBook(id)

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

export default router;