import { ProfileDto } from '@/modules/profile/dtos/profile.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleType } from '../../../constants';
import type { UserEntity } from '../user.entity';

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserResponseDto extends AbstractDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiProperty()
  username: string;

  @ApiPropertyOptional({ enum: RoleType })
  role: RoleType;

  @ApiPropertyOptional()
  profile?: ProfileDto;

  // @ApiPropertyOptional()
  // isActive?: boolean;

  constructor(user: UserEntity) {
    super(user);
    this.name = user.name;
    this.username = user.username;
    this.role = user.role;
    this.profile = user.profile;

    // this.isActive = options?.isActive;
  }
}
