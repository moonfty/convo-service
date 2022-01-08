import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { Service } from '../interfaces/service.interface';
import MoonModel from '../models/moon/moon.model';

@Injectable()
export class MoonService extends Service {
    constructor() {
        super(MoonModel, '');
    }
}
