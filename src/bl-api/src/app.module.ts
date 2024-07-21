import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrizesModule } from './prizes/prizes.module';
import { LaureatesModule } from './laureates/laureates.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthorizationMiddleware } from './middlewares/authorization.middleware';

@Module({
  imports: [PrizesModule, LaureatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');

    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes('*');
  }
}
