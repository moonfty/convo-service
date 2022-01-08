import { IMoon } from '../models/moon/moon.model';
import { Schema, model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export class CreateMoonDto implements IMoon {
    user: string;
    convo?: mongoose.Types.ObjectId;
    comment?: mongoose.Types.ObjectId;
    create_date: number;
}
