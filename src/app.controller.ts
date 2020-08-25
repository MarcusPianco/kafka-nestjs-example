import { Controller, Get, OnModuleInit, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, Payload, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    console.log(this.kafkaClient);
    this.kafkaClient.subscribeToResponseOf('prove.topic');
    await this.kafkaClient.connect();
  }

  @MessagePattern('prove.topic')
  valueData(@Payload() message: any): any {
    console.log(message);
  }
}
