import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookInterfaces } from '../interfaces/book.interfaces';
import { Book, BookDocument } from './mongoose/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly BookModel: Model<BookDocument>,
  ) {}

  public createBook(data: BookInterfaces): Promise<BookDocument> {
    const book = new this.BookModel(data);
    return book.save();
  }

  public getBooks(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  public updateBook(id: string, data: BookInterfaces): Promise<BookDocument> {
    return this.BookModel.findOneAndUpdate({ _id: id }, data).exec();
  }

  public delete(id: string): Promise<BookDocument> {
    return this.BookModel.findOneAndRemove({ _id: id }).exec();
  }
}
