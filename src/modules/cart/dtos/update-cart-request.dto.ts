import { UUIDField } from '@/decorators/field.decorators';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  action_type: 1 | 2; // 1: Update quantity | 2: Delete

  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  cart_line_id: Uuid;

  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  product_id: Uuid;

  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  store_id: Uuid;

  @ApiPropertyOptional()
  @UUIDField()
  old_product_variant_id?: Uuid | null | undefined;

  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  product_variant_id: Uuid;

  // @ApiProperty()
  // @IsNumber()
  // old_quantity: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}
