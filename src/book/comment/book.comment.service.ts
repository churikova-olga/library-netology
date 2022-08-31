import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BookCommentInterfaces,
  UpdateCommentInterfaces,
} from '../../interfaces/book.comment.interfaces';
import { Comment, BookCommentDocument } from '../mongoose/comment.schema';

@Injectable()
export class BookCommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly BookCommentModel: Model<BookCommentDocument>,
  ) {}

  public async createComment(data: BookCommentInterfaces) {
    const comment = await this.BookCommentModel.create(data);
    return comment;
  }

  public getAllComments(bookId: string): Promise<BookCommentDocument[]> {
    return this.BookCommentModel.find({ bookId: bookId }).exec();
  }

  public updateComment(
    id: string,
    comment: UpdateCommentInterfaces,
  ): Promise<BookCommentDocument> {
    return this.BookCommentModel.findOneAndUpdate({ _id: id }, comment).exec();
  }

  public deleteComment(id: string): Promise<BookCommentDocument> {
    return this.BookCommentModel.findOneAndRemove({ _id: id }).exec();
  }
}
