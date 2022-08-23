import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
} from '@nestjs/common';

import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class ExceptionInterceptors implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => ({ data: data, status: 'success' })),
      catchError((err: any) => {
        return throwError(
          new BadGatewayException({ data: err || 'error', status: 'fail' }),
        );
      }),
    );
  }
}
