import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { OtpModule } from '../otp/otp.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [OtpModule, EmailModule],
})
export class AuthModule {}
