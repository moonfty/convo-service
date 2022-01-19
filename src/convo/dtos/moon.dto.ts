import { IMoon } from '../models/moon/moon.model';
import { Schema, model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export class CreateMoonDto {
    user?: string;
    convo?: string;
    comment?: string;
    create_date: number;
}

export class DeleteMoonDto {
    user?: string;
    convo?: string;
    comment?: string;
}
