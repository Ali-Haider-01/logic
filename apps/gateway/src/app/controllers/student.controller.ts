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
import { Auth, SERVICES, StudentDto, StudentFilterDto } from '@logic-test/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('student')
@ApiBearerAuth()
@Auth()
@ApiTags('student')
export class StudentController {
  constructor(@Inject(SERVICES.STUDENT) private studentClient: ClientProxy) {}

  @Get()
  async getAllStudents(@Query() studentFilterDto: StudentFilterDto) {
     return await firstValueFrom(this.studentClient.send('all-students', studentFilterDto));
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string) {
    return await firstValueFrom( this.studentClient.send('single-student', id));
  }

  @Post()
  async postStudent(@Body() studentDto: StudentDto) {
    return await firstValueFrom( this.studentClient.send('add-student', studentDto));
  }

  @Put(':id')
  async putStudent(@Param('id') id: string, @Body() studentDto: StudentDto) {
    return await firstValueFrom( this.studentClient.send('update-student', { id, studentDto }));
  }

  @Patch(':id')
  async patchStudent(@Param('id') id: string, @Body() studentDto: StudentDto) {
    return await firstValueFrom( this.studentClient.send('update-student', { id, studentDto }));
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return await firstValueFrom( this.studentClient.send('delete-student', id));
  }
}
