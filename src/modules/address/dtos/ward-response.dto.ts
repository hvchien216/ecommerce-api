import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { WardEntity } from '../ward.entity';

export class WardResponseDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  district_id: Uuid;

  constructor(ward: WardEntity) {
    super(ward);
    this.name = ward.name;
    this.district_id = ward.district_id;
  }
}
