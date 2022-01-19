import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { Schema } from 'mongoose';
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

    async updateMoon(id: string, up: boolean): Promise<any> {
        return await this.analyticService.updateMoon(id, up);
    }
}
