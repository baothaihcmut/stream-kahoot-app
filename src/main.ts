import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { instance } from './common/logger/winston.logger';
import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const appCtx = await NestFactory.createApplicationContext(AppModule);
  const cfgService = appCtx.get<ConfigService>(ConfigService);
  const logger = instance(cfgService);
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });
  app.use(cookieParser());
  await app.listen(cfgService.get<number>('port') || 3000);
}
bootstrap();
