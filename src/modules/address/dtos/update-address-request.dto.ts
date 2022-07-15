import { UUIDField } from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateAddressRequestDto } from './create-address-request.dto';

export class UpdateAddressRequestDto extends CreateAddressRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @UUIDField()
  address_id: Uuid;
}
