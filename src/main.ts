import {
  Injectable,
  NestMiddleware,
  NestModule,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.originalUrl);
    console.log(req.url);
    next();
  }
}

@Module({})
class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // http://127.0.0.1:3000/test/a
  // const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/test');
  await app.listen(3000);
}

bootstrap();