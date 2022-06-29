import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ProductVariantEntity } from '../product-variant.entity';

export class ProductVariantsResponseDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  constructor(productVariant: ProductVariantEntity) {
    super(productVariant);
    this.name = productVariant.name;
    this.quantity = productVariant.quantity;
    this.price = productVariant.price;
  }
}
