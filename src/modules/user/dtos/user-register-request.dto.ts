import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';
import { UserProfileDto } from './user-profile.dto';

// const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export class CreateUserRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly username: string;

  @ApiProperty({ minLength: 6 })
  // @Matches(passwordRegex, { message: 'Password too weak' })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  readonly profile: UserProfileDto;
}
