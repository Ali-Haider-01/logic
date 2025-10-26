import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClassController } from './controllers/class.controller';
import { CourseController } from './controllers/course.controller';
import { StudentController } from './controllers/student.controller';
import { UserController } from './controllers/user.controller';
import { ALL_SERVICE_PROVIDERS, SERVICE_PROVIDERS } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    ClassController,
    CourseController,
    StudentController,
    UserController,
  ],
  providers: [...SERVICE_PROVIDERS, ALL_SERVICE_PROVIDERS],
  exports: [...SERVICE_PROVIDERS],
})
export class AppModule {}
