import { PipeTransform } from '@nestjs/common';
import {
  applyDecorators,
  Param,
  ParseUUIDPipe,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import type { Type } from '@nestjs/common/interfaces';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

import { ROLES_KEY, RoleType } from '../constants';
import { PublicRoute } from './public-route.decorator';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth(
  roles: RoleType[] = [],
  options?: Partial<{ public: boolean }>,
): MethodDecorator {
  const isPublicRoute = options?.public;

  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard({ public: isPublicRoute }), RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    PublicRoute(isPublicRoute),
  );
}

export function UUIDParam(
  property: string,
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator {
  return Param(property, new ParseUUIDPipe({ version: '4' }), ...pipes);
}
