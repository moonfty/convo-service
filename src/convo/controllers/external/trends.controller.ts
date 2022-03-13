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
import { ResponseFormatDto, TransformInterceptor } from 'src/convo/interceptors/transfrom.interceptor';
import { IcyToolService } from 'src/convo/services/external/icytool.service';
import { SolanaService } from 'src/convo/services/external/solana.service';

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
export class TrendsController {
    constructor(private readonly icyToolService: IcyToolService , private readonly solanaService: SolanaService) {
    }
    
    @ApiResponse({ status: 200 })
    @Get('eth')
    async getTrendsETH(
    ): Promise<any> {
        try {
            const collections = await this.icyToolService.getTrendingCollections();
            return collections;
        } catch (error) {
            throw error;
        }
    }

    @ApiResponse({ status: 200 })
    @Get('sol')
    async getTrendsSOL(
    ): Promise<any> {
        try {
            const collections = await this.solanaService.getTrendingCollections();
            return collections;
        } catch (error) {
            throw error;
        }
    }
}
