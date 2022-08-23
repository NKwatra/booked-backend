import { Body, Controller, Post, Session } from '@nestjs/common';
import { Serialize } from '../decorators/serialize.decorator';
import { UserObjectDto } from '../user/dtos/user-object.dto';
import { AuthService } from './auth.service';
import { CreateOtpDto } from './dtos/create-otp.dto';
import { LoginDto } from './dtos/login.dto';

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

  @Serialize(UserObjectDto)
  @Post('/login')
  async login(@Body() details: LoginDto, @Session() session: any) {
    const user = await this.authService.login(details);
    session.userId = user.id;
    session.orgId = details.organization;
    session.userType = user.userType;
    return user;
  }
}
