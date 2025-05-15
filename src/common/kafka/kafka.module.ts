import { Module } from '@nestjs/common';
import { KafkaProducerService } from './kafka_producer.service';
import { ClientsModule, KafkaOptions, Transport } from '@nestjs/microservices';
import { KAFKA_PRODUCER } from '../constance';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_PRODUCER,
        useFactory: (cfgService: ConfigService): KafkaOptions => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: cfgService.get<string[]>('kafka.brokers'),
            },
            producer: {
              allowAutoTopicCreation: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService],
})
export class KafkaModule {}
