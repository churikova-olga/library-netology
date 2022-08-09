import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookInterfaces, IParamId } from '../interfaces/book.interfaces';
import { BookDocument } from './mongoose/book.schema';

@Controller('books')
export class BookController {
  constructor(private readonly BookService: BookService) {}

  @Get()
  async getBooks(): Promise<BookDocument[]> {
    return this.BookService.getBooks();
  }

  @Post()
  async createBook(@Body() body: BookInterfaces): Promise<BookDocument> {
    return this.BookService.createBook(body);
  }

  @Put(':id')
  public updateBook(
    @Param() { id }: IParamId,
    @Body() body: BookInterfaces,
  ): Promise<BookDocument> {
    return this.BookService.updateBook(id, body);
  }

  @Delete(':id')
  public delete(@Param() { id }: IParamId): Promise<BookDocument> {
    return this.BookService.delete(id);
  }
}
