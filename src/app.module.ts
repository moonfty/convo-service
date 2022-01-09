import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentController } from './convo/controllers/comment.controller';
import { MoonController } from './convo/controllers/moon.controller';
import { ConvoController } from './convo/convo.controller';
import { ConvoModule } from './convo/convo.module';
import { JWTAuthenticationMiddleware } from './convo/middlewares/jwt.middleware';

@Module({
    imports: [
        ConvoModule,
        ThrottlerModule.forRoot({
            ttl: 1,
            limit: 50,
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JWTAuthenticationMiddleware)
            .forRoutes(ConvoController, MoonController, CommentController);
    }
}
