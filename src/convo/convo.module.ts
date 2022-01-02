import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ChildCommentController } from './controllers/childcomment.controller';
import { CommentController } from './controllers/comment.controller';
import { ConvoController } from './convo.controller';
import { ConvoService } from './convo.service';
import { AnalyticService } from './interfaces/analytic.service.interface';
import { JWTAuthenticationMiddleware } from './middlewares/jwt.middleware';
import { PermissionMiddleware } from './middlewares/permission.middleware';
import { ChildCommentService } from './services/childcomment.service';
import { CommentService } from './services/comment.service';

@Module({
    imports: [],
    providers: [ConvoService, CommentService, ChildCommentService],
    controllers: [ConvoController, CommentController, ChildCommentController],
})
export class ConvoModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JWTAuthenticationMiddleware).exclude();
    }
}
