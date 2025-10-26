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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, CoursesDto, MESSAGE_PATTERNS, SERVICES } from '@logic-test/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

const {
  GET_COURSE,
  GET_CART_COURSE,
  REMOVE_ALL_CART_COURSE,
  REMOVE_SINGLE_CART_COURSE,
  GET_SINGLE_COURSE,
  ADD_COURSE,
  DELETE_COURSE,
} = MESSAGE_PATTERNS.COURSE;

@Controller('course')
@ApiBearerAuth()
@Auth()
@ApiTags('course')
export class CourseController {
  constructor(@Inject(SERVICES.COURSE) private courseClient: ClientProxy) {}

  @Get()
  async getCourse() {
    return await firstValueFrom(this.courseClient.send(GET_COURSE, {}));
  }

  @Get()
  async getCartCourse() {
    return await firstValueFrom(this.courseClient.send( GET_CART_COURSE, {}));
  }

  @Patch()
  async removeAllCartCourse() {
    return await firstValueFrom(
      this.courseClient.send(REMOVE_ALL_CART_COURSE, {})
    );
  }

  @Put(':id')
  async removeSingleCartCourse(@Param('id') id: string) {
    return await firstValueFrom(
      this.courseClient.send(REMOVE_SINGLE_CART_COURSE, id)
    );
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return await firstValueFrom(
      this.courseClient.send(GET_SINGLE_COURSE, id)
    );
  }

  @Post()
  async postCourse(@Body() courseDto: CoursesDto) {
    return await firstValueFrom(
      this.courseClient.send(ADD_COURSE, courseDto)
    );
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    return await firstValueFrom(
      this.courseClient.send(DELETE_COURSE, id)
    );
  }
}
