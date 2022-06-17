import { InvalidCredentialsException } from '@/common/http';
import { GeneratorService } from '@/shared/services/generator.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { Optional } from 'src/common/type';
import { validateHash } from 'src/common/utils';
import { TokenType } from 'src/constants';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './dtos/jwt-payload.dto';
import { TokenPayloadDto } from './dtos/token-payload.dto';
import { UserLoginDto } from '../user/dtos/user-login.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private cache: RedisCacheService,
    private generatorService: GeneratorService,
  ) {}

  generateAuthToken(payload: Omit<JwtPayload, 'type'>): TokenPayloadDto {
    const accessTokenExpiresIn =
      this.configService.authConfig.accessTokenExpirationTime;
    const refreshTokenExpires =
      this.configService.authConfig.refreshTokenExpirationTime;

    const key = `token_${payload.userId}_${this.generatorService.uuid()}`;

    const accessToken = this.generateToken(
      { ...payload, type: TokenType.ACCESS_TOKEN, key },
      accessTokenExpiresIn,
    );

    const refreshToken = this.generateToken(
      { ...payload, type: TokenType.REFRESH_TOKEN, key },
      refreshTokenExpires,
    );

    this.cache.set(key, payload, { ttl: ms(refreshTokenExpires) });

    return {
      accessTokenExpiresIn,
      accessToken,
      refreshToken,
    };
  }

  async generateRefreshToken(refreshToken: string) {
    const { userId, username, role, key } = this.verifyToken(
      refreshToken,
      TokenType.REFRESH_TOKEN,
    );

    const isRefreshTokenExist = await this.cache.get(key);
    if (!isRefreshTokenExist) {
      throw new InvalidCredentialsException();
    }

    return this.generateAuthToken({ userId, username, role });
  }

  public verifyToken(token: string, type: TokenType) {
    try {
      return this.jwtService.verify(token);
    } catch ({ name }) {
      // if (name == TokenError.TokenExpiredError && type == TokenType.AccessToken) {
      //   throw new AccessTokenExpiredException();
      // }
      // if (name == TokenError.TokenExpiredError && type == TokenType.RefreshToken) {
      //   throw new RefreshTokenExpiredException();
      // }
      // throw new InvalidTokenException();
    }
  }

  async validateUser(
    userLoginDto: UserLoginDto,
  ): Promise<Optional<UserEntity>> {
    const user = await this.userService.findOne({
      where: {
        username: userLoginDto.username,
      },
      relations: ['profile'],
    });
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    // if (user.status == UserStatus.Blocked) {
    //   throw new DisabledUserException(ErrorType.BlockedUser);
    // }

    return user!;
  }

  private generateToken(
    payload: JwtPayload & { key: string },
    expiresIn: string,
  ): string {
    const token = this.jwtService.sign(payload, { expiresIn });
    return token;
  }
}
