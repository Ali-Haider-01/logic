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
  RefreshTokenDto,
  SERVICES,
  UserDto,
} from '@logic-test/shared';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(@Inject(SERVICES.AUTH_SERVICE) private authClient: ClientProxy) {}

  @Post('signUp')
  async signUp(@Body() userDto: UserDto) {
    return await firstValueFrom(this.authClient.send('signUp', userDto));
  }

  @Post()
  async logIn(@Body() loginDto: LogInDto) {
    return await firstValueFrom(this.authClient.send('logIn', loginDto));
  }

  @Post()
  async generateOTP(@Body() emailDto: EmailDto) {
    return await firstValueFrom(this.authClient.send('generate-otp', emailDto));
  }

  @Post()
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    return await firstValueFrom(
      this.authClient.send('forgot-password', forgotPassword)
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await firstValueFrom(
      this.authClient.send('refresh-token', refreshTokenDto)
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProfile(@Request() req) {
    return await firstValueFrom(this.authClient.send('profile', req.user));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return await firstValueFrom(
      this.authClient.send('change-password', {
        email: req.user.email,
        changePasswordDto,
      })
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async logOut(@Request() req) {
    return await firstValueFrom(this.authClient.send('logOut', req.user.email));
  }
}
