import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Param,
    Patch,
    Post,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwaggerSchema, ForbiddenSwaggerSchema, NotFoundSwaggerSchema } from 'src/convo/exception-filters/http-exception.filter';
import { TransformInterceptor } from 'src/convo/interceptors/transfrom.interceptor';

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
@ApiTags('trend')
@Controller('trend')
export class ChildCommentController {

}
