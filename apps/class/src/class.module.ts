import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema} from '@logic-test/shared';
import { ClassController } from './app/class.controller';
import { ClassService } from './app/class.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Class.name,
        schema: ClassSchema,
      },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}