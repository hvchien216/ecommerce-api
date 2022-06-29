import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class CreateAttributeInProductRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  name: string; // Color

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  attribute_items: string[]; // ['Small', 'Medium', 'Large']
}
