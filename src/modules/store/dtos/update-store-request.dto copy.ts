import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class UpdateStoreRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @Trim()
  readonly bio?: string;
}
