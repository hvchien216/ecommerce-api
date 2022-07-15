import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ProvinceEntity } from '../province.entity';

export class ProvinceResponseDto extends AbstractDto {
  @ApiProperty()
  name: string;

  constructor(province: ProvinceEntity) {
    super(province);
    this.name = province.name;
  }
}
