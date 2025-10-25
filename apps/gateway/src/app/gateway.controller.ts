import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  Query, 
  Request,
  UseGuards 
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { 
  UserDto, 
  LogInDto, 
  ClassDto, 
  StudentDto, 
  StudentFilterDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  EmailDto,
  RefreshTokenDto
} from '@logic-test/shared';

@ApiTags('Gateway')
@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getData() {
    return this.gatewayService.getData();
  }

  // Auth endpoints
  @Post('auth/signup')
  signUp(@Body() userDto: UserDto) {
    return this.gatewayService.signUp(userDto);
  }

  @Post('auth/login')
  logIn(@Body() loginDto: LogInDto) {
    return this.gatewayService.logIn(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('auth/profile')
  getProfile(@Request() req) {
    return this.gatewayService.getProfile(req.user);
  }

  // Class endpoints
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('class')
  getClass() {
    return this.gatewayService.getClass();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('class/:id')
  getClassById(@Param('id') id: string) {
    return this.gatewayService.getClassById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('class')
  postClass(@Body() classDto: ClassDto) {
    return this.gatewayService.postClass(classDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('class/:id')
  deleteClass(@Param('id') id: string) {
    return this.gatewayService.deleteClass(id);
  }

  // Student endpoints
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('student')
  getAllStudents(@Query() filterDto: StudentFilterDto) {
    return this.gatewayService.getAllStudents(filterDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('student/:id')
  getStudentById(@Param('id') id: string) {
    return this.gatewayService.getStudentById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('student')
  postStudent(@Body() studentDto: StudentDto) {
    return this.gatewayService.postStudent(studentDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('student/:id')
  putStudent(@Param('id') id: string, @Body() studentDto: StudentDto) {
    return this.gatewayService.putStudent(id, studentDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('student/:id')
  patchStudent(@Param('id') id: string, @Body() studentDto: StudentDto) {
    return this.gatewayService.patchStudent(id, studentDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('student/:id')
  deleteStudent(@Param('id') id: string) {
    return this.gatewayService.deleteStudent(id);
  }
}
