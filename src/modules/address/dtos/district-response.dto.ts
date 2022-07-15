import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { DistrictEntity } from '../district.entity';

export class DistrictResponseDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  province_id: Uuid;

  constructor(district: DistrictEntity) {
    super(district);
    this.name = district.name;
    this.province_id = district.province_id;
  }
}
