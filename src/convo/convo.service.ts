import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { Schema } from 'mongoose';
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
import { MoonRepository } from './models/moon/moon.repository';

@Injectable()
export class ConvoService extends Service implements IAnalyticService {
    analyticService: AnalyticService;
    constructor() {
        super(ConvoModel, '');
        this.analyticService = new AnalyticService(ConvoModel, '');
    }

    async updateMoon(id: string, up: boolean): Promise<any> {
        return await this.analyticService.updateMoon(id, up);
    }

    async searchRelevantResultsWithPagination(data: SearchPaginationDto) {
        const res = await ConvoRepository.searchRelevantResultsWithPagination(
            data.text,
            data.page,
        );

        return res;
    }

    async updateCommentCount(id: string, up: boolean): Promise<IConvo> {
        const _convo = await ConvoModel.findById(id);
        if (up == true) {
            _convo.comment_count += 1;
        } else if (up == false) {
            _convo.comment_count -= 1;
        }

        return await _convo.save();
    }
}
