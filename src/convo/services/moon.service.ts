import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { DeleteMoonDto } from '../dtos/moon.dto';
import { Service } from '../interfaces/service.interface';
import MoonModel from '../models/moon/moon.model';
import * as mongoose from 'mongoose';

@Injectable()
export class MoonService extends Service {
    async deleteMoon(user: string, data: DeleteMoonDto) {
        if (data.convo) {
            return await MoonModel.findOneAndDelete({
                user: user,
                convo: new mongoose.Types.ObjectId(data.convo),
            });
        } else {
            const deleted_data = await MoonModel.findOneAndDelete({
                user: user,
                comment: new mongoose.Types.ObjectId(data.comment),
            });
        }
    }
    constructor() {
        super(MoonModel, '');
    }
}
