import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { DeleteMoonDto } from '../dtos/moon.dto';
import { Service } from '../interfaces/service.interface';

import EventModel, { IEvent,EventTypes, TargetContentTypes } from '../models/event/event.model';

@Injectable()
export class EventService extends Service {
    constructor() {
        super(EventModel, '');
    }

    async getEventsOfUser(receiver: string):Promise<Array<IEvent>> {
        const eventsOfUser = await EventModel.find({receiver: receiver})
        return eventsOfUser
    }}
