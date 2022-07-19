import { ProductStatusType } from '@/constants/product-status-type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class UpdateProductRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @Trim()
  description?: string;

  @ApiPropertyOptional()
  @Trim()
  image?: string;

  @ApiPropertyOptional()
  @Trim()
  images?: string;

  @ApiProperty()
  status: ProductStatusType;

  @ApiProperty()
  @IsArray()
  categoryIds: Uuid[];
}
