import { Expose, Type } from 'class-transformer';

class Expert {
  @Expose()
  name: string;
}

export class ServiceObjectDto {
  @Expose()
  name: string;
  @Expose()
  @Type(() => Expert)
  expert: Expert;
  @Expose()
  backgroundImage: string;
  @Expose()
  id: string;
}
