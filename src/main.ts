import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { instance } from './common/logger/winston.logger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appCtx = await NestFactory.createApplicationContext(AppModule);
  const cfgService = appCtx.get<ConfigService>(ConfigService);
  const logger = instance(cfgService);
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });
  await app.listen(3000);
}
bootstrap();
