import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '../interfaces/book.interfaces';

@Controller('books')
export class BookController {
  constructor(private readonly BookService: BookService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.BookService.getBooks();
  }

  @Post()
  async createBook(@Body() createBookDTO: Book) {
    return this.BookService.createBook(createBookDTO);
  }
}
