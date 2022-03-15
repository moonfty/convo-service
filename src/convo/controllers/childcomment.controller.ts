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
import { ChildCommentService } from '../services/childcomment.service';
import { IChildComment } from '../models/childcomment.model';
import { CreateChildCommentDto } from '../dtos/childcomment.dto';
import { Response } from 'express';
import { EventTypes, IEvent, ITargetContent, TargetContentTypes } from '../models/event/event.model';
import { EventService } from '../services/event.service';
import { IConvo } from '../models/convo/convo.model';
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
@ApiTags('child')
@Controller('child')
export class ChildCommentController {
    constructor(private readonly childCommentService: ChildCommentService , 
        private readonly commentService:CommentService,
        private readonly eventService:EventService,
        private readonly convoService: ConvoService) {}
    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Post()
    async create(
        @Body() data: CreateChildCommentDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<IChildComment> {
        try {
            console.log(data);
            if (!data.user) {
                data.user = response.locals.user;
            } else if (data.user && data.user != response.locals.user) {
                throw new ForbiddenException('Wrong Access Token');
            }
            const saved_event:IChildComment = await this.childCommentService.create(data);
            const updated_comment = await this.commentService.updateCommentCount(saved_event.parent,true)

            // Notification event
            const comment:IComment = await this.commentService.getById(data.parent.toString())
            if(comment.user != data.user){
                const target_content: ITargetContent = {
                    type:TargetContentTypes.comment,
                    id: data.parent.toString()
                }
                const eventData: IEvent = {performer: data.user, 
                    receiver: comment.user,
                    event_type: EventTypes.comment,
                    target_content: target_content,
                    create_date:data.create_date}
                    
                await this.eventService.create(eventData)
            }

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
    ): Promise<Array<IChildComment>> {
        try {
            const events =
                await this.childCommentService.getChildDataWithPagination(
                    'parent',
                    parent,
                    page,
                );
            return events;
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
    ): Promise<IChildComment> {
        try {
            const deleted:IChildComment = await this.childCommentService.delete(id, res.locals.user);
            const updated_comment = await this.commentService.updateCommentCount(deleted.parent,false)
            return deleted;
        } catch (error) {
            throw error;
        }
    }
}
