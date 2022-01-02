import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { errorMessages } from '../errors/convo.errors';

export interface IAnalyticService {
    upMoon(id: string, user: string): Promise<any>;
    downMoon(id: string, user: string): Promise<any>;
}

export class AnalyticService implements IAnalyticService {
    constructor(public model: Model<any>, public parent?: string) {}

    private async findData(id: string, user: any) {
        const data = await this.model.findById(id);
        if (!data) {
            throw new NotFoundException(errorMessages.NOT_FOUND_ERROR);
        }
        return data;
    }

    async upMoon(id: string, user: any) {
        const data = await this.findData(id, user);
        data['moon'] = data['moon'] + 1;
        data.last_activity_date = new Date().getTime();
        const updated = await data.save();
        return updated;
    }
    async downMoon(id: string, user: any) {
        const data = await this.findData(id, user);
        data['moon'] = data['moon'] - 1;
        data.last_activity_date = new Date().getTime();
        const updated = await data.save();
        return updated;
    }
}
