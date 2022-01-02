import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { CreateCommentDto } from './dtos/comment.dto';
import { CreateConvoDto } from './dtos/convo.dto';
import { SearchPaginationDto } from './dtos/search.dto';
import { errorMessages } from './errors/convo.errors';
import {
    AnalyticService,
    IAnalyticService,
} from './interfaces/analytic.service.interface';
import { IService, Service } from './interfaces/service.interface';
import ConvoModel, { IConvo } from './models/convo/convo.model';
import { ConvoRepository } from './models/convo/convo.repository';

@Injectable()
export class ConvoService extends Service implements IAnalyticService {
    analyticService: AnalyticService;
    constructor() {
        super(ConvoModel, '');
        this.analyticService = new AnalyticService(ConvoModel, '');
    }

    async upMoon(id: string, user: string): Promise<any> {
        return await this.analyticService.upMoon(id, user);
    }
    async downMoon(id: string, user: string): Promise<any> {
        return await this.analyticService.downMoon(id, user);
    }

    async searchRelevantResultsWithPagination(data: SearchPaginationDto) {
        const res = await ConvoRepository.searchRelevantResultsWithPagination(
            data.text,
            data.page,
        );
        return res;
    }
}
