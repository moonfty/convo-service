import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { errorMessages } from '../errors/convo.errors';

export interface IService {
    create(data);
    getChildDataWithPagination(parent: string, page: number);
    getDataWithPagination(page: number);
    delete(id: string, user: string);
}

export class Service implements IService {
    constructor(public model: Model<any>, public parent?: string) {}

    async create(data: any): Promise<any> {
        const created = await this.model.create(data);
        const saved = await created.save();
        return saved;
    }

    async delete(id: string, user: string): Promise<any> {
        const data = await this.model.findById(id);
        if (!data) {
            throw new NotFoundException(errorMessages.NOT_FOUND_ERROR);
        }
        if (data.user !== user) {
            throw new ForbiddenException(errorMessages.PERMISSION_ERROR);
        }

        const deleted = await data.delete();
        return deleted;
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
        query[this.parent] = parent;

        const data = await this.model.find(
            query,
            {},
            { skip: page * 10, limit: 10, sort: { create_date: 'asc' } },
        );
        return data;
    }
}
