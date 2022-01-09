import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { DeleteMoonDto } from '../dtos/moon.dto';
import { Service } from '../interfaces/service.interface';
import MoonModel from '../models/moon/moon.model';

@Injectable()
export class MoonService extends Service {
    constructor() {
        super(MoonModel, '');
    }
}
