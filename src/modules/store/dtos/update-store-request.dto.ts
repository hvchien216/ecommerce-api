import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';
import { LinkEmployeeToStoreRequestDto } from './link-employee-to-store-request.dto';

export class UpdateStoreRequestDto extends LinkEmployeeToStoreRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @Trim()
  readonly bio?: string;
}
