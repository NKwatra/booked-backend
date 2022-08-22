import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { ClassConstructor } from './serialize.interceptor';

@Injectable()
export class SerializeListInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const formattedObjects = data.map((object) => {
          const docWithId = { ...object._doc, id: object._doc._id.toString() };
          console.log(docWithId, object._doc, object.id);
          return plainToClass(this.dto, docWithId, {
            excludeExtraneousValues: true,
          });
        });
        return formattedObjects;
      }),
    );
  }
}
