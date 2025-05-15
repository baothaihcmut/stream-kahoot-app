import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  async setString(key: string, val: string, ttl: number) {
    await this.redisClient.set(key, val, 'EX', ttl);
  }
  async getString(key: string) {
    return await this.redisClient.get(key);
  }
  async setObject<T>(key: string, val: T, ttl: number) {
    await this.redisClient.set(key, JSON.stringify(val), 'EX', ttl);
  }
  async getObject<T>(key: string): Promise<T> {
    const res = await this.redisClient.get(key);
    return JSON.parse(res);
  }
}
