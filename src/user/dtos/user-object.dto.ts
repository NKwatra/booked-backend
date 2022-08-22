import { Expose } from 'class-transformer';
import { UserType } from '../enums/user-type.enum';

export class UserObjectDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  userType: UserType;

  @Expose()
  profilePic: string;
}
