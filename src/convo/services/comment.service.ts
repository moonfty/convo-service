import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { CreateCommentDto } from '../dtos/comment.dto';
import CommentModel, { IComment } from '../models/comment.model';

@Injectable()
export class CommentService {
    async create(data: CreateCommentDto): Promise<IComment> {
        const comment = await CommentModel.create(data);
        const saved = await comment.save();
        return saved;
    }

    async getCommentsWithPagination(
        convo: string,
        page: number,
    ): Promise<Array<IComment>> {
        const comments = await CommentModel.find(
            { convo: convo },
            {},
            { skip: page * 10, limit: 10, sort: { create_date: 'asc' } },
        );
        return comments;
    }
}
