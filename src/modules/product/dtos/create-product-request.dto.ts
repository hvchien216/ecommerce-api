import { ProductStatusType } from '@/constants/product-status-type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class CreateProductRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @Trim()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  slug: string;

  @ApiPropertyOptional()
  @Trim()
  thumbnail?: string;

  @ApiPropertyOptional()
  @Trim()
  images?: string;

  @ApiPropertyOptional()
  code?: string;

  @ApiProperty()
  status: ProductStatusType;

  @ApiProperty()
  categoryId: Uuid;

  @ApiProperty()
  storeId: Uuid;
}
