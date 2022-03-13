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
import { MoonRepository } from '../models/moon/moon.repository';
import { Response } from 'express';
import { CreateEventDto, CreateGMEventDto } from '../dtos/event.dto';
import { EventService } from '../services/event.service';
import { EventTypes, IEvent } from '../models/event/event.model';

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
@ApiTags('event')
@Controller('event')
export class EventController {
    constructor(
        private readonly eventService: EventService,
    ) {}

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Get()
    async getEventsOfUser(
        //@Param('page') page: number,
        @Res({ passthrough: true }) response: Response,
    ): Promise<Array<IEvent>> {
        try {
            const events = await this.eventService.getEventsOfUser(response.locals.user);
            return events;
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Post('/gm')
    async createEventOfGM(
        @Body() data: CreateGMEventDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<IEvent> {
        try {
            const event_obj:IEvent = {receiver: data.receiver,
                 performer: data.performer,
                 create_date: data.create_date,
                 event_type: EventTypes.gm
            }
            const saved_event = this.eventService.create(event_obj)
            return saved_event;
        } catch (error) {
            throw error;
        }
    }

}
