import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';

import { CategoryEntity } from '../category.entity';

export class CategoryResponseDto extends AbstractDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  parent_id?: Uuid;

  @ApiProperty()
  children?: CategoryResponseDto[];

  constructor(category: CategoryEntity) {
    super(category);
    this.title = category.title;
    this.description = category.description;
    this.parent_id = category.parent_id;
  }
}
