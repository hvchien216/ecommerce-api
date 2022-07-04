import { UUIDField } from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

class ItemsDto {
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
  product_variant_id: Uuid;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class CartLinesCreateOrderDto {
  // NOTED
  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  store_id: Uuid;

  @ApiProperty({
    isArray: true,
    type: ItemsDto,
  })
  items: ItemsDto[];
}
