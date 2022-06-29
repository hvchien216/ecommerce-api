import { ProductStatusType } from '@/constants/product-status-type';
import { AttributeResponseDto } from '@/modules/attribute/dtos';
import { CategoryResponseDto } from '@/modules/category/dtos';
import { ProductVariantsResponseDto } from '@/modules/product-variant/dtos';
import { StoreResponseDto } from '@/modules/store/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ProductEntity } from '../product.entity';

export class ProductResponseDto extends AbstractDto {
  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  slug: string;

  @ApiPropertyOptional()
  thumbnail?: string;

  @ApiPropertyOptional()
  images?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  price_min: number;

  @ApiProperty()
  price_max: number;

  @ApiProperty()
  code?: string;

  @ApiProperty()
  status: ProductStatusType;

  @ApiPropertyOptional()
  category?: CategoryResponseDto;

  @ApiPropertyOptional()
  storeOwner?: StoreResponseDto;

  @ApiProperty()
  tier_variations?: AttributeResponseDto[];

  @ApiProperty()
  models?: ProductVariantsResponseDto[];

  constructor(product: ProductEntity) {
    super(product);
    this.title = product.title;
    this.description = product.description;
    this.slug = product.slug;
    this.thumbnail = product.thumbnail;
    this.images = product.images;
    this.price = product.price;
    this.price_min = product.price_min;
    this.price_max = product.price_max;
    this.code = product.code;
    this.status = product.status;
  }
}
