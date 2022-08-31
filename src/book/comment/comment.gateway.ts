import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BookCommentInterfaces } from '../../interfaces/book.comment.interfaces';
import { BookCommentService } from './book.comment.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CommentGateway {
  constructor(private readonly BookCommentService: BookCommentService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('get-all-comments')
  getAllComments(@MessageBody() bookId: object) {
    return this.BookCommentService.getAllComments(bookId['bookId']);
  }

  @SubscribeMessage('create-comment')
  async createComment(@MessageBody() data: BookCommentInterfaces) {
    return this.BookCommentService.createComment(data);
  }
}
