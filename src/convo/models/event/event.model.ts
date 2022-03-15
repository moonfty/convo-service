import { Schema, model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';


export enum EventTypes {
    follow = 'follow',
    moon = 'moon',
    comment = 'comment',
    gm = 'gm'
}

export enum TargetContentTypes {
    convo = 'convo',
    comment = 'comment',
    gm = 'gm'
}

export interface ITargetContent {
    type: TargetContentTypes
    id: string
}

export interface IEvent {
    receiver: string;
    performer: string
    event_type: EventTypes
    target_content?: ITargetContent
    create_date: number
}

const TargetContentSchema: Schema<ITargetContent> = new Schema(
    {
      type: { type: String, enum: TargetContentTypes, required: true },
      id: { type: String,  required: true},
    },
    {
      toJSON: {
        transform(_doc, ret) {
          delete ret.__v;
          delete ret._id;
        },
      },
    },
  );

export interface IEventDocument extends IEvent, Document {}

export const EventSchema: Schema<IEventDocument> = new Schema(
    {
        receiver: { type: String, required: true, index: true },
        performer: { type: String, required: true, index: true },
        event_type: { type: String, enum: EventTypes, required: true },
        target_content: TargetContentSchema,
        create_date: { type: Number}
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

const EventModel = model<IEventDocument>('Event', EventSchema);
EventModel.createIndexes();

export default EventModel;
