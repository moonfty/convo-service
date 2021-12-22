import { IComment } from '../models/comment.model';

export class CreateCommentDto {
    convo: string;
    user: string;
    text: string;
    moon: number;
    nft_post?: string;
    link?: string;
    asset?: string;
    event_date?: number;
    color?: string;
}
