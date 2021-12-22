import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { CreateCommentDto } from './dtos/comment.dto';
import { CreateConvoDto } from './dtos/convo.dto';
import { IService, Service } from './interfaces/service.interface';
import ConvoModel, { IConvo } from './models/convo.model';

@Injectable()
export class ConvoService extends Service implements IService {
    constructor() {
        super(ConvoModel, '');
    }
}
