import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, MESSAGE_PATTERNS, SERVICES, StudentDto, StudentFilterDto } from '@logic-test/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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
@ApiTags('student')
export class StudentController {
  constructor(@Inject(SERVICES.STUDENT) private studentClient: ClientProxy) { }

  @Get()
  async getAllStudents(@Query() studentFilterDto: StudentFilterDto) {
    return await firstValueFrom(this.studentClient.send(ALL_STUDENTS, studentFilterDto));
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string) {
    return await firstValueFrom(this.studentClient.send(SINGLE_STUDENT, id));
  }

  @Post()
  async postStudent(@Body() studentDto: StudentDto) {
    return await firstValueFrom(this.studentClient.send(ADD_STUDENT, studentDto));
  }

  @Put(':id')
  async putStudent(@Param('id') id: string, @Body() studentDto: StudentDto) {
    return await firstValueFrom(this.studentClient.send(PUT_STUDENT, { id, studentDto }));
  }

  @Patch(':id')
  async patchStudent(@Param('id') id: string, @Body() studentDto: StudentDto) {
    return await firstValueFrom(this.studentClient.send(PATCH_STUDENT, { id, studentDto }));
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return await firstValueFrom(this.studentClient.send(DELETE_STUDENT, id));
  }
}
