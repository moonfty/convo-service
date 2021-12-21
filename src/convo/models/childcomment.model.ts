import { Schema } from 'mongoose';

export interface IChildComment {
    parent: string;
    user: string;
    text: string;
    create_date: number;
    delete_date: number;
}

export interface IChildCommentDocument extends IChildComment, Document {}

export const ChildCommentSchema: Schema<IChildCommentDocument> = new Schema({
    parent: { type: String, ref: 'Comment' },
    user: { type: String, required: true },
    text: { type: String, required: true },
    create_date: { type: Number, default: new Date().getTime() },
    delete_date: { type: Number },
});
