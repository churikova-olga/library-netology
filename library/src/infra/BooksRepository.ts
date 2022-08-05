import {IBook} from "../interfaces/IBook";
import {BookModel} from "../models/Book"
import "reflect-metadata";
import { injectable } from "inversify";

@injectable()
class BooksRepository{
     public createBook(book: IBook){
        const newBook = new BookModel(book);
        newBook.save();
        return newBook;
    }
    public getBook(id: string){
        return BookModel.findById({_id: id}).select('-__v');
    }
    public getBooks(){
        return BookModel.find().select('-__v');
    }
    public updateBook(id:string, book: IBook){
        return BookModel.findByIdAndUpdate({_id: id}, {book}).select('-__v');
    }
    public deleteBook(id:string){
        return BookModel.deleteOne({_id: id})
    }
}

export {BooksRepository}