import { Module } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';
import { ContextModule } from './context/context.module';
import { LoggerModule } from './logger/logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { KafkaModule } from './kafka/kafka.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigsModule,
    ContextModule,
    LoggerModule,
    PrismaModule,
    // KafkaModule,
    // RedisModule,
  ],
  exports: [
    ConfigsModule,
    ContextModule,
    LoggerModule,
    PrismaModule,
    // KafkaModule,
  ],
})
export class CommonModule {}
