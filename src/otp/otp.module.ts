import { Module } from '@nestjs/common';
import { OTP_TOKEN } from './constants';
import { OtpService } from './otp.service';
import { totp } from 'otplib';

@Module({
  providers: [
    OtpService,
    {
      provide: OTP_TOKEN,
      useFactory: () => {
        totp.options = {
          digits: 6,
          step: 600,
        };
        return totp;
      },
    },
  ],
  exports: [OtpService],
})
export class OtpModule {}
