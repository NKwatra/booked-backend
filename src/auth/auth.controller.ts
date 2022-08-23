import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateOtpDto } from './dtos/create-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/otp')
  async generateOtp(@Body() details: CreateOtpDto) {
    await this.authService.generateOtp(details.email, details.organization);
    return {
      message: 'Otp for login has been sent to your registered email',
    };
  }
}
