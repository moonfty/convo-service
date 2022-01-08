import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mongoDB } from 'src/config';
import { CommentController } from '../controllers/comment.controller';
import { ConvoController } from '../convo.controller';
import { ConvoModule } from '../convo.module';
import { ConvoService } from '../convo.service';
import { CommentService } from '../services/comment.service';

export class E2EHelper {
    mongod: MongoMemoryServer;
    constructor(mongod) {
        this.mongod = mongod;
    }

    testingModuleSettings = {
        imports: [
            ConvoModule,
            MongooseModule.forRootAsync({
                useFactory: async () => {
                    const uri = await this.mongod.getUri();
                    return {
                        uri: uri,
                    };
                },
            }),
        ],
        controllers: [ConvoController, CommentController],
        providers: [ConvoService, CommentService],
    };
}
