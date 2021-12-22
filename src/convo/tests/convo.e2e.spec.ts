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

const mongod = new MongoMemoryServer();

describe('Convo Service E2E Tests', () => {
    var app: INestApplication;
    const baseUrl = '/convo';

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
            controllers: [ConvoController],
            providers: [ConvoService],
        }).compile();

        app = moduleRef.createNestApplication();
        const uri = await mongod.getUri();
        await mongoose.connect(uri);
        await app.init();
    });

    it('POST /convo', async () => {
        const data: CreateConvoDto = {
            user: '123',
            text: 'New Convo test',
        };
        const response = await request(app.getHttpServer())
            .post(baseUrl)
            .send(data)
            .expect(201);

        console.log(response.body.data);
    });

    it('GET /convo/page/:page', async () => {
        const response = await request(app.getHttpServer())
            .get(baseUrl + '/page/0')
            .expect(200);

        console.log(response.body.data);
    });
});
