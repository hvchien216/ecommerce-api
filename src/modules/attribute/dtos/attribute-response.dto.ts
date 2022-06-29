import { AttributeItemResponseDto } from '@/modules/attribute-item/dtos';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { AttributeEntity } from '../attribute.entity';

export class AttributeResponseDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  options: AttributeItemResponseDto[];

  constructor(attribute: AttributeEntity) {
    super(attribute);
    this.name = attribute.name;
  }
}
