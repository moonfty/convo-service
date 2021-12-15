import { Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiProperty } from '@nestjs/swagger';

export interface ResponseFormat<T> {
  statusCode: number;
  msg: string;
  data: T;
}

export class ResponseFormatDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  msg: string;
  /*
  @ApiProperty()
  data: IEvent;
  */
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<ResponseFormat<T>>
{
  intercept(context, next): Observable<ResponseFormat<T>> {
    try {
      return next.handle().pipe(
        map((data) => ({
          statusCode: context.switchToHttp().getResponse().statusCode,
          data: data,
          msg: 'success',
        })),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
