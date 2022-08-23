import { Test } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
