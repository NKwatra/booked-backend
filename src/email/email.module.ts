import { Module } from '@nestjs/common';
import { EMAIL_TOKEN } from './constants';
import { EmailService } from './email.service';
import * as sendInBlue from 'sib-api-v3-sdk';

@Module({
  providers: [
    EmailService,
    {
      provide: EMAIL_TOKEN,
      useFactory: () => {
        const defaultClient = sendInBlue.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SEND_IN_BLUE_KEY;
        const apiInstance = new sendInBlue.TransactionalEmailsApi();
        return apiInstance;
      },
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
