import { Module } from '@nestjs/common';
import { GatewayController } from './app/gateway.controller';
import { GatewayService } from './app/gateway.service';
import { SERVICES } from '@shared/constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@logic-test/shared';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_KEY'),
      }),
    }),
    ClientsModule.registerAsync(
      Object.values(SERVICES).map((SERVICE_NAME) => ({
        name: SERVICE_NAME,
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RMQ_URI')],
            queue: config.get(`RMQ_${SERVICE_NAME}_QUEUE`),
            prefetchCount: 1,
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      }))
    ),
  ],
  controllers: [GatewayController],
  providers: [GatewayService, JwtStrategy],
})
export class GatewayModule {}
