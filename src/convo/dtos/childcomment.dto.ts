import { IComment } from '../models/comment.model';

export class CreateChildCommentDto {
    parent: string;
    user: string;
    text: string;
}
