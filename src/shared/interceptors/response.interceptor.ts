import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../interfaces/response.interface';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage = this.reflector.get<string>(
      'response_message',
      context.getHandler(),
    );

    return next.handle().pipe(
      map((result) => {
        const statusCode = context.switchToHttp().getResponse().statusCode;

        // Check if `meta` and `links` are present in the result
        if (result && result.meta && result.links) {
          return {
            statusCode,
            message: responseMessage || '',
            ...result, // Spread `data`, `meta`, and `links` directly
          };
        }

        // Default structure with `data` key if `meta` and `links` are not present
        return {
          statusCode,
          message: responseMessage || '',
          data: result,
        };
      }),
    );
  }
}
