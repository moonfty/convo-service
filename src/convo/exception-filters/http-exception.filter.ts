import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const stack = exception instanceof HttpException ? exception.stack : null;

    const msg =
      exception instanceof HttpException ? exception.message : exception;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error_message: msg,
      error_stack: stack,
    });
  }
}

export const NotFoundSwaggerSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'number', default: 404 },
    timestamp: { type: 'string', default: new Date().getTime() },
    path: { type: 'string', default: '/auth/signin' },
    error_stack: {
      type: 'string',
      default: 'Notfound Error... .controller16:2',
    },
  },
};

export const BadRequestSwaggerSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'number', default: 400 },
    timestamp: { type: 'string', default: new Date().getTime() },
    path: { type: 'string', default: '/auth/signin' },
    error_stack: {
      type: 'string',
      default: 'Validation Error... .controller16:2',
    },
  },
};

export const ForbiddenSwaggerSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'number', default: 403 },
    timestamp: { type: 'string', default: new Date().getTime() },
    path: { type: 'string', default: '/auth/signin' },
    error_stack: {
      type: 'string',
      default: 'Permission Error... .controller16:2',
    },
  },
};
