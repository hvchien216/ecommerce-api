import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Optional } from 'src/common/type';
import { validateHash } from 'src/common/utils';
import { RoleType, TokenType } from 'src/constants';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ApiConfigService,
  ) {}

  async generateAccessToken(data: {
    userId: Uuid;
    role: RoleType;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        role: data.role,
        type: TokenType.ACCESS_TOKEN,
      }),
    });
  }

  async validateUser(
    userLoginDto: UserLoginDto,
  ): Promise<Optional<UserEntity>> {
    const user = await this.userService.findOne({
      where: {
        username: userLoginDto.username,
      },
    });

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException();
    }

    return user!;
  }
}
