import { Module } from '@nestjs/common';
import {
  RedisModule as IoRedisModule,
  RedisModuleOptions,
} from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    IoRedisModule.forRootAsync({
      useFactory: (configSerice: ConfigService) => ({
        type: 'single',
        options: {
          host: configSerice.get<string>('redis.host'),
          port: configSerice.get<number>('redis.port'),
          db: 0,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [IoRedisModule],
})
export class RedisModule {}
