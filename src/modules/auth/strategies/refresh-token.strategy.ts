import { RoleType } from '@/constants/role-type';
import { TokenType } from '@/constants/token-type';
import { UserEntity } from '@/modules/user/user.entity';
import { UserService } from '@/modules/user/user.service';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private userService: UserService,
    apiConfigService: ApiConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: apiConfigService.authConfig.publicKey,
    });
  }

  async validate(args: {
    userId: Uuid;
    role: RoleType;
    type: TokenType;
  }): Promise<UserEntity> {
    if (args.type !== TokenType.REFRESH_TOKEN) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne({
      where: {
        id: args.userId as any,
        role: args.role,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
