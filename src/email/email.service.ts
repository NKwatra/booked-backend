import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_TOKEN } from './constants';
import type { EmailArgs } from './interfaces/email-args.interface';
import * as sendInBlue from 'sib-api-v3-sdk';

@Injectable()
export class EmailService {
  constructor(@Inject(EMAIL_TOKEN) private mail: any) {}

  async sendMail(details: EmailArgs) {
    const email = new sendInBlue.SendSmtpEmail();
    email.to = [{ email: details.to }];
    email.subject = details.subject;
    email.htmlContent = details.html;
    email.sender = { email: process.env.FROM_MAIL, name: 'Admin' };
    try {
      await this.mail.sendTransacEmail(email);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
