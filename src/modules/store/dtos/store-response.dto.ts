import { Trim } from '@/decorators/transform.decorators';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StoreEntity } from '../store.entity';

export class StoreResponseDto extends AbstractDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  name: string;

  @ApiPropertyOptional()
  bio?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  slug: string;

  constructor(store: StoreEntity) {
    super(store);
    this.name = store.name;
    this.bio = store.bio;
    this.slug = store.slug;
  }
}
