import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { DeleteMoonDto } from '../dtos/moon.dto';
import { Service } from '../interfaces/service.interface';

import EventModel from '../models/event/event.model';

@Injectable()
export class EventService extends Service {
    constructor() {
        super(EventModel, '');
    }

}
