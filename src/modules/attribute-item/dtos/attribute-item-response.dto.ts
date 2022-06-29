import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { AttributeItemEntity } from '../attribute-item.entity';

export class AttributeItemResponseDto extends AbstractDto {
  @ApiProperty()
  value: string;

  constructor(attributeItem: AttributeItemEntity) {
    super(attributeItem);
    this.value = attributeItem.value;
  }
}
