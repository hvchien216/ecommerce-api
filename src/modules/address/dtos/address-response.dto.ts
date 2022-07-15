import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { AddressEntity } from '../address.entity';
import { DistrictResponseDto } from './district-response.dto';
import { ProvinceResponseDto } from './province-response.dto';
import { WardResponseDto } from './ward-response.dto';

export class AddressResponseDto extends AbstractDto {
  @ApiProperty()
  province: ProvinceResponseDto;

  @ApiProperty()
  district: DistrictResponseDto;

  @ApiProperty()
  ward: WardResponseDto;

  @ApiProperty()
  street: string;

  @ApiProperty()
  is_default: boolean;

  constructor(address: AddressEntity) {
    super(address);
    this.street = address.street;
    this.is_default = address.is_default;
  }
}
