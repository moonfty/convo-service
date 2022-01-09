import { IComment } from '../models/comment.model';
import * as mongoose from 'mongoose';

export class CreateCommentDto {
    convo: mongoose.Types.ObjectId;
    user?: string;
    text: string;
    nft_post?: string;
    link?: string;
    asset?: string;
    event_date?: number;
    color?: string;
}

export interface ICommentResponse {
    comment: IComment;
    isMoon: boolean;
}
