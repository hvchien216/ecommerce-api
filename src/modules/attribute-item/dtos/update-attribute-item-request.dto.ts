import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class UpdateAttributeItemRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  value: string;
}
