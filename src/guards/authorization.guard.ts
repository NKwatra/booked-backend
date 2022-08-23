import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/authorization.decorator';
import { UserType } from '../user/enums/user-type.enum';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const minAccess = this.reflector.get<string>(
      ROLES_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const session = request.session;
    const permissions = {
      [UserType.CUSTOMER]: 0,
      [UserType.EXPERT]: 1,
      [UserType.ADMIN]: 2,
    };
    return (
      session.userType &&
      permissions[session.userType] >= permissions[minAccess]
    );
  }
}
