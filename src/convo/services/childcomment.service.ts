import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { CreateCommentDto } from '../dtos/comment.dto';
import { Service } from '../interfaces/service.interface';
import ChildCommentModel from '../models/childcomment.model';
import CommentModel, { IComment } from '../models/comment.model';

@Injectable()
export class ChildCommentService extends Service {
    constructor() {
        super(ChildCommentModel, 'parent');
    }
}
