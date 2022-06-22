import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class CreateUpdateCategoryRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @Trim()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly parent_id?: Uuid;
}
