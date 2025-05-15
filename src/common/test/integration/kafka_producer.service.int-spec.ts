import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { KafkaProducerService } from 'src/common/kafka/kafka_producer.service';

describe('Kafka service Int test', () => {
  let kafkaService: KafkaProducerService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // kafkaService = moduleRef.get(KafkaProducerService);
    // await kafkaService.onModuleInit();
  });
  it.todo('should pass');
});
