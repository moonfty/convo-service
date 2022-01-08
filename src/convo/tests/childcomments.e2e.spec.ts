import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import { timestampAddMonth } from '../utils/date.util';
import { ConvoModule } from '../convo.module';
import { ConvoController } from '../convo.controller';
import { ConvoService } from '../convo.service';
import { CreateConvoDto } from '../dtos/convo.dto';
import CommentModel, { IComment } from '../models/comment.model';
import { CommentService } from '../services/comment.service';
import { CommentController } from '../controllers/comment.controller';
import { CreateCommentDto } from '../dtos/comment.dto';
import ConvoModel, { IConvo } from '../models/convo/convo.model';
import { ChildCommentController } from '../controllers/childcomment.controller';
import { ChildCommentService } from '../services/childcomment.service';
import { CreateChildCommentDto } from '../dtos/childcomment.dto';
import ChildCommentModel from '../models/childcomment.model';
const { ObjectId } = require('mongodb');

const mongod = new MongoMemoryServer();

describe('ChildComment Service E2E Tests', () => {
    var app: INestApplication;
    let saved_comment: IComment;
    const baseUrl = '/child';

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConvoModule,
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        const uri = await mongod.getUri();
                        return {
                            uri: uri,
                        };
                    },
                }),
            ],
            controllers: [ChildCommentController],
            providers: [ChildCommentService],
        }).compile();

        app = moduleRef.createNestApplication();
        const uri = await mongod.getUri();
        await mongoose.connect(uri);
        await app.init();

        //Seed Comment Data
        const data: CreateCommentDto = {
            user: '123',
            text: 'Test Convo Data',
            convo: new ObjectId(),
        };
        const created = await CommentModel.create(data);
        saved_comment = await created.save();

        //Seed ChildComment Data
        const list = [
            {
                parent: saved_comment.id,
                user: '124',
                text: 'Nice comment test',
                create_date: 1640215120772,
            },
            {
                parent: saved_comment.id,
                user: '124',
                text: 'Nice comment test',
                create_date: 1640215120600,
            },
        ];

        const saved_list = await ChildCommentModel.insertMany(list);
    });

    it('POST /child', async () => {
        const data: CreateChildCommentDto = {
            parent: saved_comment.id,
            user: '124',
            text: 'Nice comment test',
        };

        for (var i = 0; i < 15; i++) {
            const response = await request(app.getHttpServer())
                .post(baseUrl)
                .send(data)
                .expect(201);
        }
    });

    it('GET /comment/:id/page/:page', async () => {
        const response = await request(app.getHttpServer())
            .get(baseUrl + '/' + saved_comment.id + '/page/0')
            .expect(200);
        const res_data = response.body.data;
        expect(res_data.length).toBe(10);
        expect(res_data[0].create_date).toBe(1640215120600);
    });

    it('GET /comment/:id/page/:page', async () => {
        const response = await request(app.getHttpServer())
            .get(baseUrl + '/' + saved_comment.id + '/page/1')
            .expect(200);
        const res_data = response.body.data;
        expect(res_data.length).toBe(7);
    });
});
