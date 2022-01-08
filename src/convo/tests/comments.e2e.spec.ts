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
import CommentModel from '../models/comment.model';
import { CommentService } from '../services/comment.service';
import { CommentController } from '../controllers/comment.controller';
import { CreateCommentDto } from '../dtos/comment.dto';
import ConvoModel, { IConvo } from '../models/convo/convo.model';

const mongod = new MongoMemoryServer();

describe('Comment Service E2E Tests', () => {
    var app: INestApplication;
    let saved_convo: IConvo;
    const baseUrl = '/comment';

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                CommentModel,
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        const uri = await mongod.getUri();
                        return {
                            uri: uri,
                        };
                    },
                }),
            ],
            controllers: [CommentController],
            providers: [CommentService],
        }).compile();

        app = moduleRef.createNestApplication();
        const uri = await mongod.getUri();
        await mongoose.connect(uri);
        await app.init();

        //Seed Convo Data
        const data: CreateConvoDto = {
            user: '123',
            text: 'Test Convo Data',
        };
        const created_convo = await ConvoModel.create(data);
        saved_convo = await created_convo.save();
    });

    it('POST /comment', async () => {
        const data: CreateCommentDto = {
            convo: saved_convo.id,
            user: '124',
            text: 'Nice convo test',
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
            .get(baseUrl + '/' + saved_convo.id + '/page/0')
            .expect(200);
        const res_data = response.body.data;
        expect(res_data.length).toBe(10);
    });

    it('GET /comment/:id/page/:page', async () => {
        const response = await request(app.getHttpServer())
            .get(baseUrl + '/' + saved_convo.id + '/page/1')
            .expect(200);
        const res_data = response.body.data;
        expect(res_data.length).toBe(5);
    });
});
