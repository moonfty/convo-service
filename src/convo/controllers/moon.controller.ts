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
import CommentModel, { IComment } from '../models/comment.model';
import { MoonRepository } from '../models/moon/moon.repository';
import { CreateMoonDto, DeleteMoonDto } from '../dtos/moon.dto';
import { MoonService } from '../services/moon.service';
import MoonModel, { IMoon } from '../models/moon/moon.model';
import { ConvoService } from '../convo.service';
import { Response } from 'express';
import ConvoModel from '../models/convo/convo.model';
import { EventTypes, IEvent, ITargetContent, TargetContentTypes } from '../models/event/event.model';
import { EventService } from '../services/event.service';

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
        private readonly eventService: EventService,
    ) {}
    @ApiResponse({ status: 201, type: ResponseFormatDto })
    @Post()
    async create(
        @Body() data: CreateMoonDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<IMoon> {
        try {
            if (!data.user) {
                data.user = response.locals.user;
            } else if (data.user && data.user != response.locals.user) {
                throw new ForbiddenException('Wrong Access Token');
            }

            if (data.convo) {
                const convodetail = await ConvoModel.findOne({
                    user: data.user,
                    _id: data.convo,
                });
                if (convodetail) {
                    throw new ForbiddenException(
                        'Cannot moon your own content',
                    );
                }
                const moondetail = await MoonModel.findOne({
                    user: data.user,
                    convo: data.convo,
                });
                if (!moondetail) {
                    const saved_event = await this.moonService.create(data);
                    const updated_convo = await this.convoService.updateMoon(
                        data.convo,
                        true,
                    );

                    // Event Notification
                    const target_content: ITargetContent = {
                        type:TargetContentTypes.convo,
                        id: data.convo
                    }
                    const eventData: IEvent = {performer: data.user, 
                        receiver: updated_convo.user,
                        event_type: EventTypes.moon,
                        target_content: target_content,
                        create_date:data.create_date}
                        
                    await this.eventService.create(eventData)

                    return saved_event;

                }
            } else {
                const commentdetail = await CommentModel.findOne({
                    user: data.user,
                    _id: data.comment,
                });
                if (commentdetail) {
                    throw new ForbiddenException(
                        'Cannot moon your own content',
                    );
                }
                const moondetail = await MoonModel.findOne({
                    user: data.user,
                    comment: data.comment,
                });
                if (!moondetail) {
                    const saved_event = await this.moonService.create(data);
                    const updated_comment:IComment =
                        await this.commentService.updateMoon(
                            data.comment,
                            true,
                        );

                    // Event Notification
                    const convodetail = await ConvoModel.findOne({
                        _id: updated_comment.convo,
                    });
                    if(convodetail.user != updated_comment.user) {
                        const target_content: ITargetContent = {
                            type:TargetContentTypes.comment,
                            id: data.comment
                        }
                        const eventData: IEvent = {performer: data.user, 
                            receiver: updated_comment.user,
                            event_type: EventTypes.moon,
                            target_content: target_content,
                            create_date:data.create_date}
                        await this.eventService.create(eventData)

                    }
                    return saved_event;
                }
            }
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({ status: 201, type: ResponseFormatDto })
    @Delete()
    async delete(
        @Body() data: DeleteMoonDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<IMoon> {
        try {
            if (!data.user) {
                data.user = response.locals.user;
            } else if (data.user && data.user != response.locals.user) {
                throw new ForbiddenException('Wrong Access Token');
            }
            const deleted_moon = await this.moonService.deleteMoon(
                data.user,
                data,
            );
            if (data.convo) {
                const updated_convo = await this.convoService.updateMoon(
                    data.convo,
                    false,
                );
            } else {
                const updated_comment = await this.commentService.updateMoon(
                    data.comment,
                    false,
                );
            }

            return deleted_moon;
        } catch (error) {
            throw error;
        }
    }
}
