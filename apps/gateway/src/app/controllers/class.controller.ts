import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, ClassDto, SERVICES } from '@logic-test/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('class')
@ApiBearerAuth()
@Auth()
@ApiTags('class')
export class ClassController {
  constructor(@Inject(SERVICES.CLASS) private classClient: ClientProxy) {}

  @Get()
  async getClass() {
    return await firstValueFrom(this.classClient.send('get-class', {}));
  }

  @Get(':id')
  async getClassById(@Param('id') id: string) {
    return await firstValueFrom(
      this.classClient.send('get-single-class', id)
    );
  }

  @Post()
  async postClass(@Body() classDto: ClassDto) {
    return await firstValueFrom(this.classClient.send('add-class', classDto));
  }

  @Delete(':id')
  async deleteClass(@Param('id') id: string) {
    return await firstValueFrom(this.classClient.send('delete-class', id));
  }
}
