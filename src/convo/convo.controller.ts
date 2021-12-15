import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConvoService } from './convo.service';
import {
  NotFoundSwaggerSchema,
  BadRequestSwaggerSchema,
  ForbiddenSwaggerSchema,
} from './exception-filters/http-exception.filter';
import {
  ResponseFormat,
  ResponseFormatDto,
  TransformInterceptor,
} from './interceptors/transfrom.interceptor';

@ApiResponse({ status: 404, schema: NotFoundSwaggerSchema })
@ApiResponse({
  status: 400,
  schema: BadRequestSwaggerSchema,
})
@ApiResponse({
  status: 403,
  schema: ForbiddenSwaggerSchema,
})
@UseInterceptors(TransformInterceptor)
@ApiTags('convo')
@Controller('convo')
export class ConvoController {
  constructor(private readonly convoService: ConvoService) {}
}
