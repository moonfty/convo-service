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
import { CommentService } from '../services/comment.service';
import { CreateCommentDto, ICommentResponse } from '../dtos/comment.dto';
import {
    NotFoundSwaggerSchema,
    BadRequestSwaggerSchema,
    ForbiddenSwaggerSchema,
} from '../exception-filters/http-exception.filter';
import {
    ResponseFormat,
    ResponseFormatDto,
    TransformInterceptor,
} from '../interceptors/transfrom.interceptor';
import { IComment } from '../models/comment.model';
import { MoonRepository } from '../models/moon/moon.repository';
import { CreateMoonDto } from '../dtos/moon.dto';
import { MoonService } from '../services/moon.service';
import { IMoon } from '../models/moon/moon.model';
import { ConvoService } from '../convo.service';

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
@ApiTags('moon')
@Controller('moon')
export class MoonController {
    constructor(
        private readonly moonService: MoonService,
        private readonly commentService: CommentService,
        private readonly convoService: ConvoService,
    ) {}
    @ApiResponse({ status: 201, type: ResponseFormatDto })
    @Post()
    async create(@Body() data: CreateMoonDto): Promise<IMoon> {
        try {
            const saved_event = await this.moonService.create(data);
            if (data.convo) {
                const updated_convo = await this.convoService.updateMoon(
                    data.convo.toString(),
                    true,
                );
            } else {
                const updated_comment = await this.commentService.updateMoon(
                    data.comment.toString(),
                    true,
                );
            }

            return saved_event;
        } catch (error) {
            throw error;
        }
    }
}
