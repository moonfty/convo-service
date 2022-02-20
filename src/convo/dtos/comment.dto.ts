import { IComment } from '../models/comment.model';
import * as mongoose from 'mongoose';

export class CreateCommentDto {
    convo: mongoose.Schema.Types.ObjectId;
    user?: string;
    text: string;
    nft_post?: string;
    link?: string;
    asset?: string;
    event_date?: number;
    color?: string;
    create_date?: number
}

export interface ICommentResponse {
    comment: IComment;
    isMoon: boolean;
}
