import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
  Inject,
} from '@nestjs/common';
import {
  ChangePasswordDto,
  EmailDto,
  ForgotPasswordDto,
  LogInDto,
  MESSAGE_PATTERNS,
  RefreshTokenDto,
  SERVICES,
  UserDto,
} from '@logic-test/shared';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

const {
  SIGN_UP,
  LOG_IN,
  GENERATE_OTP,
  FORGOT_PASSWORD,
  REFRESH_TOKEN,
  GET_PROFILE,
  CHANGE_PASSWORD,
  LOG_OUT,
} = MESSAGE_PATTERNS.USER;

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(@Inject(SERVICES.AUTH_SERVICE) private authClient: ClientProxy) {}

  @Post()
  async signUp(@Body() userDto: UserDto) {
    return await firstValueFrom(this.authClient.send(SIGN_UP, userDto));
  }

  @Post()
  async logIn(@Body() loginDto: LogInDto) {
    return await firstValueFrom(this.authClient.send(LOG_IN, loginDto));
  }

  @Post()
  async generateOTP(@Body() emailDto: EmailDto) {
    return await firstValueFrom(this.authClient.send(GENERATE_OTP, emailDto));
  }

  @Post()
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    return await firstValueFrom(
      this.authClient.send(FORGOT_PASSWORD, forgotPassword)
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await firstValueFrom(
      this.authClient.send(REFRESH_TOKEN, refreshTokenDto)
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProfile(@Request() req) {
    return await firstValueFrom(this.authClient.send(GET_PROFILE, req.user));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return await firstValueFrom(
      this.authClient.send(CHANGE_PASSWORD, {
        email: req.user.email,
        changePasswordDto,
      })
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async logOut(@Request() req) {
    return await firstValueFrom(this.authClient.send(LOG_OUT, req.user.email));
  }
}
