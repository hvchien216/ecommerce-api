import { ApiProperty } from '@nestjs/swagger';

import { UserResponseDto } from '../../user/dtos/user.dto';
import { TokenPayloadDto } from './token-payload.dto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: UserResponseDto, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
