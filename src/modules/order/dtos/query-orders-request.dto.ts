import { OrderStatus } from '@/constants/order-status';
import { UUIDField } from '@/decorators/field.decorators';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class QueryOrdersRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  trx_id?: string;

  @ApiPropertyOptional()
  @UUIDField()
  customer?: Uuid;

  @ApiPropertyOptional()
  status?: OrderStatus;

  @ApiPropertyOptional()
  @IsDateString()
  fromDate?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  toDate?: Date;
}
