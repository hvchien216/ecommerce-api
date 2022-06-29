import { UUIDField } from '@/decorators/field.decorators';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class CreateProductVariantsRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  name: string;

  @ApiPropertyOptional()
  price?: number;

  @ApiPropertyOptional()
  quantity?: number;

  @ApiPropertyOptional()
  @UUIDField()
  product_id?: Uuid;
}
