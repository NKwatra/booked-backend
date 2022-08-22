import { UseInterceptors } from '@nestjs/common';
import { SerializeListInterceptor } from 'src/interceptors/seralize-list.interceptor';
import { ClassConstructor } from '../interceptors/serialize.interceptor';

export const SerializeList = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeListInterceptor(dto));
};
