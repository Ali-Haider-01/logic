import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangePasswordDto,
  EmailDto,
  ForgotPasswordDto,
  LogInDto,
  RefreshTokenDto,
  UserDto,
} from '@logic-test/shared';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  signUp(@Body() userDto: UserDto) {
    return this.userService.signUp(userDto);
  }

  @Post('logIn')
  logIn(@Body() loginDto: LogInDto) {
    return this.userService.logIn(loginDto);
  }

  @Post('generate-otp')
  generateOTP(@Body() emailDto: EmailDto) {
    return this.userService.generateOTP(emailDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    return this.userService.forgotPassword(forgotPassword);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.userService.refreshToken(refreshTokenDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.userProfile(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('change-password')
  changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.userService.changePassword(req.user.email, changePasswordDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('logOut')
  logOut(@Request() req) {
    return this.userService.logOut(req.user.email);
  }
}
