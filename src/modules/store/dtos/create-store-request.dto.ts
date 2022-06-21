import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';
import { LinkEmployeeToStoreRequestDto } from './link-employee-to-store-request.dto';

export class CreateStoreRequestDto extends LinkEmployeeToStoreRequestDto {
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
