import { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export class CreateChildCommentDto {
    parent: mongoose.Schema.Types.ObjectId;
    text: string;
    user?: string;
}
