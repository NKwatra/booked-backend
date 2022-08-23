import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { UserType } from '../user/enums/user-type.enum';

export const ROLES_KEY = 'roles';

export const Authorized = (minAccess: UserType) => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, minAccess),
    UseGuards(AuthorizationGuard),
  );
};
