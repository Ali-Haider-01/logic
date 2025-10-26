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
import { Auth, CoursesDto, SERVICES } from '@logic-test/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('course')
@ApiBearerAuth()
@Auth()
@ApiTags('course')
export class CourseController {
  constructor(@Inject(SERVICES.COURSE) private courseClient: ClientProxy) {}

  @Get()
  async getCourse() {
    return await firstValueFrom(this.courseClient.send('get-course', {}));
  }

  @Get()
  async getCartCourse() {
    return await firstValueFrom(this.courseClient.send('get-cart-course', {}));
  }

  @Patch()
  async removeAllCartCourse() {
    return await firstValueFrom(
      this.courseClient.send('remove-all-cart-course', {})
    );
  }

  @Put(':id')
  async removeSingleCartCourse(@Param('id') id: string) {
    return await firstValueFrom(
      this.courseClient.send('remove-single-cart-course', id)
    );
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return await firstValueFrom(
      this.courseClient.send('get-single-course', id)
    );
  }

  @Post()
  async postCourse(@Body() courseDto: CoursesDto) {
    return await firstValueFrom(
      this.courseClient.send('add-course', courseDto)
    );
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    return await firstValueFrom(
      this.courseClient.send('delete-course', id)
    );
  }
}
