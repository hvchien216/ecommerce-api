import { UUIDField } from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartLineDto {
  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  user_id: Uuid;

  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  product_id: Uuid;

  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  store_id: Uuid;

  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  product_variant_id: Uuid;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}
