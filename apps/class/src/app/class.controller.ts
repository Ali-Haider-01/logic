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
import { Auth, ClassDto, MESSAGE_PATTERNS } from '@logic-test/shared';
import { MessagePattern } from '@nestjs/microservices';

const {
  GET_CLASS,
  GET_SINGLE_CLASS,
  ADD_CLASS,
  DELETE_CLASS
} = MESSAGE_PATTERNS.CLASS;

@Controller('class')
@ApiBearerAuth()
@Auth()
export class ClassController {
  constructor(private readonly classService: ClassService) { }

  @MessagePattern(GET_CLASS)
  getClass() {
    return this.classService.getClass();
  }

  @MessagePattern(GET_SINGLE_CLASS)
  getClassById(@Param('id') id: string) {
    return this.classService.getClassById(id);
  }

  @MessagePattern(ADD_CLASS)
  postClass(@Body() classDto: ClassDto) {
    return this.classService.postClass(classDto);
  }

  @MessagePattern(DELETE_CLASS)
  deleteClass(@Param('id') id: string) {
    return this.classService.deleteClass(id);
  }
}
