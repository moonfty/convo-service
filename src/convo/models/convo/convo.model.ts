import { Schema, model } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IConvo {
    id: Schema.Types.ObjectId;
    user: string;
    text: string;
    moon: number;
    comment_count: number;
    nft_post?: string;
    link?: string;
    asset?: string;
    event_date?: number;
    color?: string;
    create_date?: number;
    last_activity_date: number;
    delete_date?: number;
}

export interface IConvoDocument extends IConvo, Document {}

export const ConvoSchema: Schema<IConvoDocument> = new Schema(
    {
        user: { type: String, required: true },
        text: { type: String, required: true },
        moon: { type: Number, required: true, default: 0 },
        comment_count: { type: Number, required: true, default: 0 },
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
                delete ret._id;
            },
        },
    },
);

ConvoSchema.index({
    text: 'text',
    product_description: 'text',
});
const ConvoModel = model<IConvoDocument>('Convo', ConvoSchema);
ConvoModel.createIndexes();

export default ConvoModel;
