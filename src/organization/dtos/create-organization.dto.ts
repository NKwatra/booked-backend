import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString({
    message: 'Organization name must be a string of characters',
  })
  @IsNotEmpty({
    message: 'Organization name cannot be empty',
  })
  name: string;

  @IsString({
    message: 'Organization address must be a string of characters',
  })
  @IsNotEmpty({
    message: 'Organization address cannot be empty',
  })
  address: string;
}
