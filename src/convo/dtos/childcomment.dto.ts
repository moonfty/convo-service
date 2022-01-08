import { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export class CreateChildCommentDto {
    parent: mongoose.Types.ObjectId;
    user: string;
    text: string;
}
