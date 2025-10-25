import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ClassService } from './class.service';
import { Auth, ClassDto } from '@logic-test/shared';

@Controller('class')
@ApiBearerAuth()
@Auth()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get('get-class')
  getClass() {
    return this.classService.getClass();
  }

  @Get('get-single-class/:id')
  getClassById(@Param('id') id: string) {
    return this.classService.getClassById(id);
  }

  @Post('add-class')
  postClass(@Body() classDto: ClassDto) {
    return this.classService.postClass(classDto);
  }

  @Delete('delete-class/:id')
  deleteClass(@Param('id') id: string) {
    return this.classService.deleteClass(id);
  }
}
