import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { OtpService } from '../otp/otp.service';
import type { EmailArgs } from '../email/interfaces/email-args.interface';
import { LoginDto } from './dtos/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private otpService: OtpService,
    private mailService: EmailService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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

  async login(details: LoginDto) {
    const secret = details.email + details.organization;
    const isValid = this.otpService.verifyOtp(secret, details.otp);
    if (!isValid) {
      throw new UnauthorizedException('Please enter a valid otp');
    }
    const user = await this.userModel.findOne({ email: details.email });
    return user;
  }
}
