import { IsEmail, IsMongoId } from 'class-validator';

export class CreateOtpDto {
  @IsEmail({
    message: 'Please enter a valid email address',
  })
  email: string;
  @IsMongoId({
    message: 'Organization should be a valid objectId',
  })
  organization: string;
}
