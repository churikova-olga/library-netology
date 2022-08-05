"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_1 = require("../../middleware/file");
const container_1 = require("../../infra/container");
const BooksRepository_1 = require("../../infra/BooksRepository");
const router = express_1.default.Router();
router.post('/', file_1.fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = container_1.container.get(BooksRepository_1.BooksRepository);
    if (req.files) {
        const files = req.files;
        const fileBook = files['fileBook'][0].path;
        const fileCover = files['fileCover'][0].path;
        const { title, description, authors, favorite, fileName } = req.body;
        try {
            const newBook = yield repo.createBook({ title, description, authors, favorite, fileCover, fileName, fileBook });
            res.status(201);
            res.json(newBook);
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ errormessage: "Internal Server Error" });
        }
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = container_1.container.get(BooksRepository_1.BooksRepository);
    const books = yield repo.getBooks();
    res.json(books);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = container_1.container.get(BooksRepository_1.BooksRepository);
    const { id } = req.params;
    try {
        const book = yield repo.getBook(id);
        res.json(book);
    }
    catch (e) {
        console.error(e);
        res.status(404).json({ errormessage: "book | not found" });
    }
}));
router.put('/:id', file_1.fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fileBook = "";
    let fileCover = "";
    const repo = container_1.container.get(BooksRepository_1.BooksRepository);
    const { id } = req.params;
    const { title, description, authors, favorite, fileName } = req.body;
    try {
        const book = yield repo.getBook(id);
        if (req.files.length) {
            const files = req.files;
            fileBook = files['fileBook'][0].path;
            fileCover = files['fileCover'][0].path;
        }
        else {
            fileCover = book.fileCover;
            fileBook = book.fileBook;
        }
        yield repo.updateBook(id, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        });
        res.redirect(`/api/book/${id}`);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ errormessage: "Internal Server Error" });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const repo = container_1.container.get(BooksRepository_1.BooksRepository);
    try {
        yield repo.deleteBook(id);
        res.json(true);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ errormessage: "Internal Server Error" });
    }
}));
router.get('/:id/download', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const repo = container_1.container.get(BooksRepository_1.BooksRepository);
    const book = yield repo.getBook(id);
    try {
        console.log(`${book.fileBook}`);
        res.download(`${book.fileBook}`, err => {
            if (err) {
                res.status(404).json({ errormessage: "file not found" });
            }
        });
    }
    catch (e) {
        console.error(e);
        res.status(404).json({ errormessage: "book | not found" });
    }
}));
exports.default = router;
