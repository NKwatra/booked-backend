import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { OtpService } from '../otp/otp.service';
import type { EmailArgs } from '../email/interfaces/email-args.interface';

@Injectable()
export class AuthService {
  constructor(
    private otpService: OtpService,
    private mailService: EmailService,
  ) {}

  async generateOtp(email: string, organization: string) {
    const secret = email + organization;
    const otp = this.otpService.generateOtp(secret);
    const emailDetails: EmailArgs = {
      to: email,
      subject: 'Otp for login for booked',
      html: `
      <p>Dear user,</p>
      The otp for your request to login into booked is <strong>${otp}</strong> 
      `,
    };
    try {
      await this.mailService.sendMail(emailDetails);
    } catch (e) {
      throw new InternalServerErrorException(
        'Something went wrong. Please try again',
      );
    }
  }
}
