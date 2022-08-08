import { Injectable } from '@nestjs/common';
import { Book } from '../interfaces/book.interfaces';

@Injectable()
export class BookService {
  private readonly books: Book[] = [];

  createBook(book: Book) {
    this.books.push(book);
  }

  getBooks(): Book[] {
    return this.books;
  }
}
