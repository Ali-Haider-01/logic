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
import { Auth, ClassDto, MESSAGE_PATTERNS, SERVICES } from '@logic-test/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

const {
  GET_CLASS,
  GET_SINGLE_CLASS,
  ADD_CLASS,
  DELETE_CLASS
} = MESSAGE_PATTERNS.CLASS;

@Controller('class')
@ApiBearerAuth()
@Auth()
@ApiTags('class')
export class ClassController {
  constructor(@Inject(SERVICES.CLASS) private classClient: ClientProxy) {}

  @Get()
  async getClass() {
    return await firstValueFrom(this.classClient.send(GET_CLASS, {}));
  }

  @Get(':id')
  async getClassById(@Param('id') id: string) {
    return await firstValueFrom(
      this.classClient.send(GET_SINGLE_CLASS, id)
    );
  }

  @Post()
  async postClass(@Body() classDto: ClassDto) {
    return await firstValueFrom(this.classClient.send(ADD_CLASS, classDto));
  }

  @Delete(':id')
  async deleteClass(@Param('id') id: string) {
    return await firstValueFrom(this.classClient.send(DELETE_CLASS, id));
  }
}
