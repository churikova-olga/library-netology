import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookInterfaces, IParamId } from '../interfaces/book.interfaces';
import { BookDocument } from './mongoose/book.schema';
import { ParseIntPipe } from '../pipes/parse-int.pipe';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { createBookSchema } from './joi/create-book.joi';

@Controller('books')
export class BookController {
  constructor(private readonly BookService: BookService) {}

  @Get()
  async getBooks(): Promise<BookDocument[]> {
    return this.BookService.getBooks();
  }

  @Get('/pipe/number/:id')
  @UsePipes(ParseIntPipe)
  async numberId(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return id;
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createBookSchema))
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
