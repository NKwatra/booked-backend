import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AddAdminDto {
  @IsString({
    message: "User's name should contain textual chracters only",
  })
  @IsNotEmpty({
    message: "User's name cannot be empty",
  })
  name: string;

  @IsEmail({
    message: 'Please enter a valid email',
  })
  email: string;

  @IsString({ message: 'Organization id should be a string' })
  @IsMongoId({ message: 'Organization id needs to be a valid objectId' })
  organization: string;
}
