import { Module } from '@nestjs/common';
import { StudentController } from './app/student.controller';
import { StudentService } from './app/student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '@logic-test/shared';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}