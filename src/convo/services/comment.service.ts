import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { CreateCommentDto } from '../dtos/comment.dto';
import { Service } from '../interfaces/service.interface';
import CommentModel, { IComment } from '../models/comment.model';

@Injectable()
export class CommentService extends Service {
    constructor() {
        super(CommentModel, 'convo');
    }
}
