import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';

import { OrderEntity } from '../order.entity';

export class OrderResponseDto extends AbstractDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  parent_id?: Uuid;

  // @ApiProperty()
  // children?: CategoryResponseDto[];

  constructor(order: OrderEntity) {
    super(order);
    // this.title = category.title;
    // this.description = category.description;
    // this.parent_id = category.parent_id;
  }
}
