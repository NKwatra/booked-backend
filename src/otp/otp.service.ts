import { Inject, Injectable } from '@nestjs/common';
import { OTP_TOKEN } from './constants';
@Injectable()
export class OtpService {
  constructor(@Inject(OTP_TOKEN) private totp: any) {}

  generateOtp(secret: string) {
    const token = this.totp.generate(secret);
    return token;
  }

  verifyOtp(secret: string, otp: string) {
    const isValid = this.totp.verify({ secret, token: otp });
    return isValid;
  }
}
