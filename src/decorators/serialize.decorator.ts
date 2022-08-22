import { UseInterceptors } from '@nestjs/common';
import {
  ClassConstructor,
  SerializeInterceptor,
} from '../interceptors/serialize.interceptor';

export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};
