import { Module } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';
import { ContextModule } from './context/context.module';
import { LoggerModule } from './logger/logger.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigsModule, ContextModule, LoggerModule, PrismaModule],
  exports: [ConfigsModule, ContextModule, LoggerModule, PrismaModule],
})
export class CommonModule {}
