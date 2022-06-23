import { ProductStatusType } from '@/constants/product-status-type';
import { CategoryResponseDto } from '@/modules/category/dtos';
import { StoreResponseDto } from '@/modules/store/dtos';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ProductEntity } from '../product.entity';

export class ProductResponseDto extends AbstractDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  thumbnail?: string;

  @ApiProperty()
  images?: string;

  @ApiProperty()
  code?: string;

  @ApiProperty()
  status: ProductStatusType;

  @ApiProperty()
  category?: CategoryResponseDto;

  @ApiProperty()
  storeOwner?: StoreResponseDto;

  constructor(product: ProductEntity) {
    super(product);
    this.title = product.title;
    this.description = product.description;
    this.slug = product.slug;
    this.thumbnail = product.thumbnail;
    this.images = product.images;
    this.code = product.code;
    this.status = product.status;
  }
}
