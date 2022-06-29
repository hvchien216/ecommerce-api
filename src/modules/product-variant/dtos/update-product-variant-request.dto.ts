import { UUIDField } from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class UpdateProductVariantsRequestDto {
  @ApiProperty()
  @UUIDField()
  product_variant_id: Uuid;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Trim()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
