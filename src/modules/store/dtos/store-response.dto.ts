import { UserResponseDto } from '@/modules/user/dtos/user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StoreEntity } from '../store.entity';

export class StoreResponseDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  bio?: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  employees?: UserResponseDto[];

  constructor(store: StoreEntity) {
    super(store);
    this.name = store.name;
    this.bio = store.bio;
    this.slug = store.slug;
  }
}
