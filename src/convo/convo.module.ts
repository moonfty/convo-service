import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ChildCommentController } from './controllers/childcomment.controller';
import { CommentController } from './controllers/comment.controller';
import { EventController } from './controllers/event.controller';
import { TrendsController } from './controllers/external/trends.controller';
import { MoonController } from './controllers/moon.controller';
import { ConvoController } from './convo.controller';
import { ConvoService } from './convo.service';
import { AnalyticService } from './interfaces/analytic.service.interface';
import { JWTAuthenticationMiddleware } from './middlewares/jwt.middleware';
import { PermissionMiddleware } from './middlewares/permission.middleware';
import { ChildCommentService } from './services/childcomment.service';
import { CommentService } from './services/comment.service';
import { EventService } from './services/event.service';
import { IcyToolService } from './services/external/icytool.service';
import { SolanaService } from './services/external/solana.service';
import { FirebaseService } from './services/firebase.service';
import { MoonService } from './services/moon.service';

@Module({
    imports: [],
    providers: [ConvoService,
                CommentService,
                ChildCommentService,
                MoonService,
                IcyToolService,
                SolanaService,
                EventService,
                FirebaseService],
    controllers: [
        ConvoController,
        CommentController,
        ChildCommentController,
        MoonController,
        TrendsController,
        EventController,
    ],
})
export class ConvoModule {}
