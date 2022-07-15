import { UUIDField } from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class CreateAddressRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  province_id: Uuid;

  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  district_id: Uuid;

  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  ward_id: Uuid;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_default: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Trim()
  @IsString()
  street: string;
}
