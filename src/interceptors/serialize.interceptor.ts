import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

export interface ClassConstructor {
  new (...args: any);
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const docWithId = { ...data._doc, id: data._doc._id.toString() };
        return plainToClass(this.dto, docWithId, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
