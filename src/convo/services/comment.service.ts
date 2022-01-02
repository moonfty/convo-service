import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { CreateCommentDto } from '../dtos/comment.dto';
import {
    AnalyticService,
    IAnalyticService,
} from '../interfaces/analytic.service.interface';
import { Service } from '../interfaces/service.interface';
import CommentModel, { IComment } from '../models/comment.model';

@Injectable()
export class CommentService extends Service implements IAnalyticService {
    analyticService: AnalyticService;
    constructor() {
        super(CommentModel, '');
        this.analyticService = new AnalyticService(CommentModel, '');
    }

    async upMoon(id: string, user: string): Promise<any> {
        return await this.analyticService.upMoon(id, user);
    }
    async downMoon(id: string, user: string): Promise<any> {
        return await this.analyticService.downMoon(id, user);
    }
}
