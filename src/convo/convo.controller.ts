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
import { Response } from 'express';
import { ConvoService } from './convo.service';
import { CreateConvoDto, IConvoResponse } from './dtos/convo.dto';
import { SearchPaginationDto } from './dtos/search.dto';
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
import { IConvo } from './models/convo/convo.model';
import { EventTypes, IEvent, ITargetContent, TargetContentTypes } from './models/event/event.model';
import { MoonRepository } from './models/moon/moon.repository';
import { EventService } from './services/event.service';
import { FirebaseService } from './services/firebase.service';

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
    constructor(private readonly convoService: ConvoService,
        private readonly eventService: EventService,
        private readonly firebaseService: FirebaseService) {}
    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Post()
    async create(
        @Body() data: CreateConvoDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<IConvo> {
        try {
            if (!data.user) {
                data.user = response.locals.user;
            } else if (data.user && data.user != response.locals.user) {
                throw new ForbiddenException('Wrong Access Token');
            }

            const saved_convo = await this.convoService.create(data);

            // Notification event
            const convo:IConvo = await this.convoService.getById(saved_convo.id)
            const target_content: ITargetContent = {
                type:TargetContentTypes.convo,
                id: saved_convo.id
            }
            const followers = await this.firebaseService.getFollowers(data.user)
            for( var follower of followers) {
                const eventData: IEvent = {performer: data.user, 
                    receiver: follower,
                    event_type: EventTypes.follow,
                    target_content: target_content,
                    create_date:data.create_date}
                await this.eventService.create(eventData)
            }

            return saved_convo;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Get(':id')
    async getWithId(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
    ): Promise<Array<IConvoResponse>> {
        try {
            const convo = await this.convoService.getById(id);
            const convos_ismoon = await MoonRepository.getConvoIsMoon(
                [convo],
                res.locals.user,
            );
            return convos_ismoon;
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Get('/page/:page')
    async getWithPagination(
        @Param('page') page: number,
        @Res({ passthrough: true }) res: Response,
    ): Promise<Array<IConvoResponse>> {
        try {
            const convos = await this.convoService.getDataWithPagination(page);
            const convos_ismoon = await MoonRepository.getConvoIsMoon(
                convos,
                res.locals.user,
            );
            return convos_ismoon;
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Get('/trend/page/:page')
    async getTrends(
        @Param('page') page: number,
        @Res({ passthrough: true }) res: Response,
    ): Promise<Array<IConvoResponse>> {
        try {
            const convos = await this.convoService.getTrends(
                page,
                res.locals.user,
            );
            return convos;
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Get('search/:text/page/:page')
    async getSearchWithPagination(
        @Param('text') text: string,
        @Param('page') page: number = 0,
        @Res({ passthrough: true }) res: Response,
    ): Promise<Array<IConvoResponse>> {
        try {
            const data: SearchPaginationDto = { text: text, page: page };
            const convos =
                await this.convoService.searchRelevantResultsWithPagination(
                    data,
                );
            const convos_ismoon = await MoonRepository.getConvoIsMoon(convos, res.locals.user);

            return convos_ismoon;
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({ status: 200, type: ResponseFormatDto })
    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
    ): Promise<IConvo> {
        try {
            const deleted = await this.convoService.delete(id, res.locals.user);
            return deleted;
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({status: 200, type: ResponseFormatDto})
    @Get('user/:user/page/:page')
    async getUserConvos(@Param('user') user: string,
        @Param('page') page: number = 0,
        @Res({ passthrough: true }) res: Response,
        ): Promise<Array<IConvoResponse>> {
            try {
                const convos = await this.convoService.getUserConvos(user, page);
                return convos;
            } catch (error) {
                throw new BadRequestException(error);
            }
        }
}
