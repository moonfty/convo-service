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
import { CreateCommentDto } from '../dtos/comment.dto';
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
import { ChildCommentService } from '../services/childcomment.service';

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
@ApiTags('child')
@Controller('child')
export class ChildCommentController {
    constructor(private readonly childCommentService: ChildCommentService) {}
    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Post()
    async create(@Body() data: CreateCommentDto): Promise<IComment> {
        try {
            const saved_event = await this.childCommentService.create(data);
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
    ): Promise<Array<IComment>> {
        try {
            const events =
                await this.childCommentService.getChildDataWithPagination(
                    parent,
                    page,
                );
            return events;
        } catch (error) {
            throw error;
        }
    }
}
