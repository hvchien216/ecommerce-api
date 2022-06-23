import { UUIDField } from '@/decorators/field.decorators';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class QueryProductsRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  q?: string;

  @ApiPropertyOptional()
  @UUIDField()
  category_id?: Uuid;

  @ApiPropertyOptional()
  @UUIDField()
  store_id?: Uuid;
}
