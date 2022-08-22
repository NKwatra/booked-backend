import { Expose } from 'class-transformer';

export class OrganizationObjectDto {
  @Expose()
  name: string;
  @Expose()
  address: string;
  @Expose()
  brandLogo: string;
  @Expose()
  id: string;
}
