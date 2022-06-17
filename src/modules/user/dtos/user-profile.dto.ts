import { GenderType } from '@/constants/gener-type';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserProfileDto {
  @ApiPropertyOptional()
  readonly gender: GenderType;

  @ApiPropertyOptional()
  @IsString()
  readonly phone: string;

  @ApiPropertyOptional()
  @IsString()
  readonly avatar: string;

  @ApiPropertyOptional()
  @IsString()
  readonly email: string;

  @ApiPropertyOptional()
  @IsString()
  readonly address: string;
}
