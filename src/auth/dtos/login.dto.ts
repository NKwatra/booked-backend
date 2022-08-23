import {
  IsEmail,
  IsMongoId,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class LoginDto {
  @IsEmail({ message: 'Please enter a valid email' })
  email: string;
  @IsMongoId({ message: 'Organization id needs to be a valid objectId' })
  organization: string;
  @IsString({ message: 'otp should contain textual chracters only' })
  @Length(6, 6)
  @IsNumberString({ message: 'otp should only contain digits' })
  otp: string;
}
