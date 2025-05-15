import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { instance } from './common/logger/winston.logger';
import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const appCtx = await NestFactory.createApplicationContext(AppModule);
  const cfgService = appCtx.get<ConfigService>(ConfigService);
  const logger = instance(cfgService);
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });
  app.setGlobalPrefix(cfgService.get<string>('app.prefix'));
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Stream app api document')
    .setDescription('Stream app api document')
    .setVersion('v1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    `${cfgService.get<string>('app.prefix')}/api-docs`,
    app,
    document,
  );
  await app.listen(cfgService.get<number>('server.port') || 3000);
}
bootstrap();
