import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
dotenv.config();

const UserDB: string = process.env.DB_USERNAME || 'olga';
const PasswordDB: string = process.env.DB_PASSWORD || '12345';
const NameDB = 'book_database';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${UserDB}:${PasswordDB}@cluster0.rhhgpyk.mongodb.net/${NameDB}?retryWrites=true&w=majority`,
    ),
    BookModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
