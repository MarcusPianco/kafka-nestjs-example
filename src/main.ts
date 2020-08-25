import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'prove',
          brokers: ['localhost:9092'],
        },
        consumer: { groupId: 'prove-group' },
      },
    },
  );

  app.listen(() => console.log('Kafka client is running'));
}

bootstrap();
