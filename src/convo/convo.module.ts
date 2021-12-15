import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConvoController } from './convo.controller';
import { ConvoService } from './convo.service';
import { JWTAuthenticationMiddleware } from './middlewares/jwt.middleware';
import { PermissionMiddleware } from './middlewares/permission.middleware';

@Module({
  imports: [],
  providers: [ConvoService],
  controllers: [ConvoController],
})
export class ConvoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTAuthenticationMiddleware).exclude();
  }
}
