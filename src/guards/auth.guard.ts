import { Type } from '@nestjs/common';
import { IAuthGuard } from '@nestjs/passport';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

export function AuthGuard(
  options?: Partial<{ public: boolean }>,
): Type<IAuthGuard> {
  const strategies = ['jwt'];
  if (options?.public) {
    strategies.push('public');
  }
  return NestAuthGuard(strategies);
}
