import { Schema, model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IComment {
    id: mongoose.Types.ObjectId;
    convo: mongoose.Types.ObjectId;
    user: string;
    text: string;
    moon: number;
    child_count: number
    nft_post?: string;
    link?: string;
    asset?: string;
    event_date?: number;
    color?: string;
    create_date?: number;
    last_activity_date: number;
    delete_date: number;
}

export interface ICommentDocument extends IComment, Document {}

export const CommentSchema: Schema<ICommentDocument> = new Schema(
    {
        convo: { type: Schema.Types.ObjectId, index: true },
        user: { type: String, required: true },
        text: { type: String, required: true },
        moon: { type: Number, required: true, default: 0 },
        child_count: { type: Number, required: true, default: 0 },
        nft_post: { type: String },
        link: { type: String },
        asset: { type: String },
        color: { type: String, required: true, default: '0' },
        event_date: { type: Number },
        create_date: { type: Number, default: +new Date() },
        last_activity_date: { type: Number, default: +new Date() },
        delete_date: { type: Number },
    },
    {
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
            },
        },
    },
);

const CommentModel = model<ICommentDocument>('Comment', CommentSchema);
CommentModel.createIndexes();

export default CommentModel;
