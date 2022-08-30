import { Test } from '@nestjs/testing';

import { BookController } from './book.controller';
import { BookService } from './book.service';

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

describe('BooksController', () => {
  let bookController: BookController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            createBook: jest.fn().mockResolvedValue(mockBook()),
            getBooks: jest.fn().mockResolvedValue([mockBook(), mockBook()]),
            updateBook: jest.fn().mockResolvedValue(mockBook()),
          },
        },
      ],
    }).compile();

    bookController = moduleRef.get<BookController>(BookController);
  });

  it('createBook', async () => {
    expect(await bookController.createBook(mockBook())).toEqual(mockBook());
  });

  it('getAllBooks', async () => {
    expect(await bookController.getBooks()).toEqual([mockBook(), mockBook()]);
  });

  it('updateBook', async () => {
    expect(await bookController.updateBook({ id: 'id' }, mockBook())).toEqual(
      mockBook(),
    );
  });
});
