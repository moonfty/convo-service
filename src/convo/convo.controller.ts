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
import { MoonRepository } from './models/moon/moon.repository';

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

            const saved_event = await this.convoService.create(data);
            return saved_event;
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
    @Get('search/:text/page/:page')
    async getSearchWithPagination(
        @Param('text') text: string,
        @Param('page') page: number = 0,
    ): Promise<Array<IConvo>> {
        try {
            const data: SearchPaginationDto = { text: text, page: page };
            const convos =
                await this.convoService.searchRelevantResultsWithPagination(
                    data,
                );
            return convos;
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
}
