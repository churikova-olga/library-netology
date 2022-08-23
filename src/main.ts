import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionInterceptors } from './interceptors/exception.interceptors';
import { HttpExceptionFilter } from './book/filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ExceptionInterceptors());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
