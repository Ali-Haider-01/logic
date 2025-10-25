/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { StudentModule } from './student.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(StudentModule,{
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URI],
      queue: process.env[`RMQ_${'STUDENT'}_QUEUE`],
      queueOptions: {
        durable: false,
      },
    },
  });
 // const globalPrefix = 'api';
 // app.setGlobalPrefix(globalPrefix);
//  const port = process.env.PORT || 3000;
  await app.listen();
 // Logger.log(
 //   `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
 // );
}

bootstrap();
