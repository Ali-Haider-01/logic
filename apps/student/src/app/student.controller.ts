import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { Auth, MESSAGE_PATTERNS, StudentDto, StudentFilterDto } from '@logic-test/shared';

const {
  ALL_STUDENTS,
  SINGLE_STUDENT,
  ADD_STUDENT,
  PUT_STUDENT,
  PATCH_STUDENT,
  DELETE_STUDENT,
} = MESSAGE_PATTERNS.STUDENT;
@Controller('student')
@ApiBearerAuth()
@Auth()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('all-students')
  getAllStudents(@Query() studentFilterDto: StudentFilterDto) {
    return this.studentService.getAllStudents(studentFilterDto);
  }

  @Get('single-student/:id')
  getStudentById(@Param('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @Post('add-student')
  postStudent(@Body() studentDto: StudentDto) {
    return this.studentService.postStudent(studentDto);
  }

  @Put('update-student/:id')
  putStudent(@Param('id') id: string, @Body() studentDto: StudentDto) {
    return this.studentService.putStudent(id, studentDto);
  }

  @Patch('update-student/:id')
  patchStudent(@Param('id') id: string, @Body() studentDto: StudentDto) {
    return this.studentService.patchStudent(id, studentDto);
  }

  @Delete('delete-student/:id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
