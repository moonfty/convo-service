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
import { CreateConvoDto } from './dtos/convo.dto';
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
import { IConvo } from './models/convo.model';

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
    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Post()
    async create(@Body() data: CreateConvoDto): Promise<IConvo> {
        try {
            const saved_event = await this.convoService.create(data);
            return saved_event;
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Get('/page/:page')
    async getWithPagination(
        @Param('page') page: number,
    ): Promise<Array<IConvo>> {
        try {
            const events = await this.convoService.getDataWithPagination(page);
            return events;
        } catch (error) {
            throw error;
        }
    }
}
