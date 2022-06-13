import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY, RoleType } from '../constants';
import isEmpty from 'lodash/isEmpty';
import { UserEntity } from '../modules/user/user.entity';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (!isEmpty(requiredRoles)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = <UserEntity>request.user;

    return requiredRoles.includes(user.role);
  }
}
