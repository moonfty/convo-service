import { Schema, model } from 'mongoose';

export interface IConvo {
    user: string;
    text: string;
    moon: number;
    nft_post?: string;
    link?: string;
    asset?: string;
    event_date?: number;
    color?: string;
    create_date: number;
    last_activity_date: number;
    delete_date: number;
}

export const DefaultConvoSchema = new Schema(
    {
        user: { type: String, required: true },
        text: { type: String, required: true },
        moon: { type: Number, required: true, default: 0 },
        nft_post: { type: String },
        link: { type: String },
        asset: { type: String },
        color: { type: String, required: true, default: 'blue' },
        event_date: { type: Number },
        create_date: { type: Number, default: new Date().getTime() },
        last_activity_date: { type: Number, default: new Date().getTime() },
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

export interface IConvoDocument extends IConvo, Document {}

export const ConvoSchema: Schema<IConvoDocument> = new Schema(
    {
        user: { type: String, required: true },
        text: { type: String, required: true },
        moon: { type: Number, required: true, default: 0 },
        nft_post: { type: String },
        link: { type: String },
        asset: { type: String },
        color: { type: String, required: true, default: 'blue' },
        event_date: { type: Number },
        create_date: { type: Number, default: new Date().getTime() },
        last_activity_date: { type: Number, default: new Date().getTime() },
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

const ConvoModel = model<IConvoDocument>('Convo', ConvoSchema);

export default ConvoModel;
