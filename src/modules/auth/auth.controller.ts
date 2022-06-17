import { JwtRefreshTokenGuard } from '@/guards/jwt-refresh-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleType } from 'src/constants';
import { Auth, AuthUser } from 'src/decorators';
import { UserResponseDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dtos/login-payload.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { TokenPayloadDto } from './dtos/token-payload.dto';
import { UserLoginDto } from '../user/dtos/user-login.dto';
import { CreateUserRequestDto } from '../user/dtos/user-register-request.dto';
import { UserMapper } from '../user/users.mapper';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  @Post('login')
  async userLogin(
    @Body(ValidationPipe) userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);
    const token = await this.authService.generateAuthToken({
      userId: userEntity.id,
      role: userEntity.role,
      username: userEntity.username,
    });

    return new LoginPayloadDto(
      UserMapper.toDtoWithRelations(userEntity),
      token,
    );
  }

  @ApiOperation({ summary: 'register api' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('register')
  async userRegister(
    @Body() userRegisterDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.userService.create(userRegisterDto);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('token/refresh')
  async getNewToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenPayloadDto> {
    const { refreshToken } = refreshTokenDto;
    return await this.authService.generateRefreshToken(refreshToken);
  }

  @Version('1')
  @Get('me')
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({
    type: UserResponseDto,
    description: 'Current user info',
  })
  getCurrentUser(@AuthUser() user: UserEntity): UserResponseDto {
    return UserMapper.toDtoWithRelations(user);
  }
}
