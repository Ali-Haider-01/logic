import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { Auth, CoursesDto, MESSAGE_PATTERNS } from '@logic-test/shared';

const {
  GET_COURSE,
  GET_CART_COURSE,
  REMOVE_ALL_CART_COURSE,
  REMOVE_SINGLE_CART_COURSE,
  GET_SINGLE_COURSE,
  ADD_COURSE,
  DELETE_COURSE
} = MESSAGE_PATTERNS.COURSE;

@Controller('course')
@ApiBearerAuth()
@Auth()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('get-course')
  getCourse() {
    return this.courseService.getCourse();
  }

  @Get('get-cart-course')
  getCartCourse() {
    return this.courseService.getCartCourse();
  }

  @Patch('remove-all-cart-course')
  removeAllCartCourse() {
    return this.courseService.removeAllCartCourse();
  }

  @Put('remove-single-cart-course/:id')
  removeSingleCartCourse(@Param('id') id: string) {
    return this.courseService.removeSingleCartCourse(id);
  }

  @Get('get-single-course/:id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @Post('add-course')
  postCourse(@Body() courseDto: CoursesDto) {
    return this.courseService.postCourse(courseDto);
  }

  @Delete('delete-course/:id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }
}
