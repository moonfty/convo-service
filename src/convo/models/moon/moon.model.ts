import { Schema, model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IMoon {
    user: string;
    convo?: mongoose.Types.ObjectId;
    comment?: mongoose.Types.ObjectId;
    create_date: number;
}

export interface IMoonDocument extends IMoon, Document {}

export const MoonSchema: Schema<IMoonDocument> = new Schema(
    {
        user: { type: String, required: true, index: true },
        convo: { type: Schema.Types.ObjectId, required: false, index: true },
        comment: { type: Schema.Types.ObjectId, required: false, index: true },
        create_date: { type: Number, default: +new Date() },
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

/*
MoonSchema.index(
    {
        convo: 1,
    },
    {
        partialFilterExpression: {
            comment: { $exists: false },
        },
    },
);

MoonSchema.index(
    {
        comment: 1,
    },
    {
        partialFilterExpression: {
            convo: { $exists: false },
        },
    },
);
*/
const MoonModel = model<IMoonDocument>('Moon', MoonSchema);
MoonModel.createIndexes();

export default MoonModel;
