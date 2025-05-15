import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { KAFKA_PRODUCER } from '../constance';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(KAFKA_PRODUCER) private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.clientKafka.connect();
  }
  async onModuleDestroy() {
    await this.clientKafka.close();
  }
  async sendMessage<T>(topic: string, data: T, headers?: Map<string, string>) {
    await lastValueFrom(
      this.clientKafka.emit(topic, {
        values: data,
        headers,
      }),
    );
  }
}
