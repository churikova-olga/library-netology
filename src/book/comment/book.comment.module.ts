import { Module } from '@nestjs/common';
import { CommentGateway } from './comment.gateway';
import { Comment, BookCommentSchema } from '../mongoose/comment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentService } from './book.comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BookCommentService, CommentGateway],
})
export class BookCommentModule {}
