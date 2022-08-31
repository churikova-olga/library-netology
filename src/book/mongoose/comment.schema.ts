import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type BookCommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  public bookId: string;

  @Prop()
  public comment: string;
}
export const BookCommentSchema = SchemaFactory.createForClass(Comment);
