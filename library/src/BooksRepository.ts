import {IBook} from "./interfaces/IBook";

class BooksRepository{
    createBook(book: IBook){}
    getBook(id: string){}
    getBooks(){}
    updateBook(id:string){}
    deleteBook(id:string){}
}

export {BooksRepository}