import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleType } from 'src/constants';
import { Auth, AuthUser } from 'src/decorators';
import { UserDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    console.log('asdasdas=?>>>', userLoginDto);
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.generateAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    return new LoginPayloadDto(userEntity.toDto(), token);
  }

  @Post('register')
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
    const createdUser = await this.userService.create(userRegisterDto);

    return createdUser.toDto({
      isActive: true,
    });
  }

  @Get('me')
  @Auth([RoleType.USER, RoleType.ADMIN])
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }
}
