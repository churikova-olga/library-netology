"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = void 0;
const Book_1 = require("../models/Book");
require("reflect-metadata");
const inversify_1 = require("inversify");
let BooksRepository = class BooksRepository {
    createBook(book) {
        const newBook = new Book_1.BookModel(book);
        newBook.save();
        return newBook;
    }
    getBook(id) {
        return Book_1.BookModel.findById({ _id: id }).select('-__v');
    }
    getBooks() {
        return Book_1.BookModel.find().select('-__v');
    }
    updateBook(id, book) {
        return Book_1.BookModel.findByIdAndUpdate({ _id: id }, { book }).select('-__v');
    }
    deleteBook(id) {
        return Book_1.BookModel.deleteOne({ _id: id });
    }
};
BooksRepository = __decorate([
    (0, inversify_1.injectable)()
], BooksRepository);
exports.BooksRepository = BooksRepository;
