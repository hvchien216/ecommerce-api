import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class CreateStoreRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @Trim()
  readonly bio?: string;

  @ApiProperty()
  @IsString()
  readonly slug: string;
}
