import { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export class CreateChildCommentDto {
    parent: mongoose.Schema.Types.ObjectId;
    user: string;
    text: string;
}
