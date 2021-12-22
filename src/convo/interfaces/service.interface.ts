import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

export interface IService {
    create(data);
    getChildDataWithPagination(parent: string, page: number);
    getDataWithPagination(page: number);
}

@Injectable()
export class Service implements IService {
    constructor(public model: Model<any>, public name?: string) {}

    async create(data: any): Promise<any> {
        const created = await this.model.create(data);
        const saved = await created.save();
        return saved;
    }

    async getDataWithPagination(page: number) {
        const data = await this.model.find(
            {},
            {},
            { skip: page * 10, limit: 10, sort: { create_date: 'asc' } },
        );
        return data;
    }

    async getChildDataWithPagination(parent: string, page: number) {
        var query = {};
        query[this.name] = parent;

        const data = await this.model.find(
            query,
            {},
            { skip: page * 10, limit: 10, sort: { create_date: 'asc' } },
        );
        return data;
    }
}
