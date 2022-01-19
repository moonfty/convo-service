import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { INestApplication } from '@nestjs/common';
import { E2EHelper } from '../helpers/test.helper';
import { createSeedData } from './seed/test.seed';

const mongod = new MongoMemoryServer();

describe('E2E Tests', () => {
    var app: INestApplication;
    var convo_id: Schema.Types.ObjectId;
    const convoUrl = '/convo';
    const commentUrl = '/comment';
    const e2eHelper = new E2EHelper(mongod);

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule(
            e2eHelper.testingModuleSettings,
        ).compile();

        app = moduleRef.createNestApplication();
        const uri = await mongod.getUri();
        await mongoose.connect(uri);
        await app.init();
        convo_id = await createSeedData();
    });

    it('GET /comment/page/:page with moondetail for user3', async () => {
        const response = await request(app.getHttpServer())
            .get(commentUrl + '/' + convo_id + '/page/0')
            .expect(200);

        console.log(response.body.data);
    });
});
