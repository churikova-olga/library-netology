import { Test } from '@nestjs/testing';
import { BookService } from './book.service';
import { Model, Query } from 'mongoose';
import { Book, BookDocument } from './mongoose/book.schema';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/nestjs-testing';

const mockBook = (
  id = 'id',
  title = 'title',
  description = 'description',
  authors = 'authors',
  favorite = 'favorite',
  fileCover = 'fileCover',
  fileName = 'fileName',
  fileBook = 'fileBook',
) => ({
  id,
  title,
  description,
  authors,
  favorite,
  fileCover,
  fileName,
  fileBook,
});
describe('BookService', () => {
  let bookService: BookService;
  let bookModel: Model<BookDocument>;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();
    bookService = moduleRef.get<BookService>(BookService);
    bookModel = moduleRef.get<Model<BookDocument>>(getModelToken(Book.name));
  });

  it('createBook', async () => {
    jest.spyOn(bookModel, 'create').mockImplementationOnce(() => mockBook());
    const result = await bookService.createBook(mockBook());

    expect(result).toEqual(mockBook());
  });

  it('getBooks', async () => {
    const booksArray = [mockBook(), mockBook()];

    jest.spyOn(bookModel, 'find').mockReturnValueOnce(
      createMock<Query<BookDocument[], BookDocument>>({
        exec: jest.fn().mockResolvedValueOnce(booksArray),
      }),
    );
    const result = await bookService.getBooks();
    expect(result).toEqual(booksArray);
  });

  it('updateBook', async () => {
    jest.spyOn(bookModel, 'findOneAndUpdate').mockReturnValueOnce(
      createMock<Query<BookDocument, BookDocument>>({
        exec: jest.fn().mockResolvedValueOnce(mockBook()),
      }),
    );

    const result = await bookService.updateBook('id', mockBook());

    expect(result).toEqual(mockBook());
  });
});
