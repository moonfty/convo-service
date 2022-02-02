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
import { Response } from 'express';
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
@ApiTags('comment')
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly convoService: ConvoService,
    ) {}
    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Post()
    async create(
        @Body() data: CreateCommentDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<IComment> {
        try {
            if (!data.user) {
                data.user = response.locals.user;
            } else if (data.user && data.user != response.locals.user) {
                throw new ForbiddenException('Wrong Access Token');
            }
            const saved_event = await this.commentService.create(data);
            await this.convoService.updateCommentCount(
                data.convo.toString(),
                true,
            );
            return saved_event;
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Get(':parent/page/:page')
    async getWithPagination(
        @Param('page') page: number,
        @Param('parent') parent: string,
        @Res({ passthrough: true }) response: Response,
    ): Promise<Array<ICommentResponse>> {
        try {
            const events = await this.commentService.getChildDataWithPagination(
                'convo',
                parent,
                page,
            );
            const result = await MoonRepository.getCommentIsMoon(
                events,
                response.locals.user,
            );

            return result;
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
    ): Promise<IComment> {
        try {
            const deleted = await this.commentService.delete(id, res.locals.user);
            const updated_convo = await this.convoService.updateCommentCount(deleted.parent.toString(),false)
            return deleted;
        } catch (error) {
            throw error;
        }
    }
}
