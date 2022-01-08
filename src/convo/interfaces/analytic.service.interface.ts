import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Query } from 'mongoose';
import { errorMessages } from '../errors/convo.errors';
import ConvoModel, { IConvoDocument } from '../models/convo/convo.model';

export interface IAnalyticService {
    updateMoon(id: string, up: boolean): Promise<any>;
}

export class AnalyticService implements IAnalyticService {
    constructor(public model: Model<any>, public parent?: string) {}

    private async findData(id: string) {
        const data = await this.model.findById(id);
        if (!data) {
            throw new NotFoundException(errorMessages.NOT_FOUND_ERROR);
        }
        return data;
    }

    async updateMoon(id: string, up: boolean) {
        const data = await this.findData(id);

        //Update Moon count of data
        if (up === true) {
            data['moon'] = data['moon'] + 1;
        } else {
            data['moon'] = data['moon'] + -1;
        }

        //Update score and last activiy date of data
        data.last_activity_date = new Date().getTime();

        const updated = await data.save();
        return updated;
    }
}
