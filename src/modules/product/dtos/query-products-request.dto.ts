import { UUIDField, UUIDFieldOptional } from '@/decorators/field.decorators';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayContains,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class QueryProductsRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  // @Trim()
  q?: string;

  @UUIDFieldOptional({ each: true, swagger: true })
  category_ids?: Uuid[];

  @UUIDFieldOptional({ swagger: true })
  store_id?: Uuid;
}
