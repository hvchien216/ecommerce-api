import { UUIDField } from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class CreateAttributeItemRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  value: string;

  @ApiProperty()
  @UUIDField()
  attribute_id: Uuid;
}
