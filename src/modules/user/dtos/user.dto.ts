import { GenderType } from '@/constants/gener-type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleType } from '../../../constants';
import type { UserEntity } from '../user.entity';

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends AbstractDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  phone: string;

  @ApiPropertyOptional({ enum: RoleType })
  role: RoleType;

  @ApiProperty()
  address: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty({ enum: RoleType })
  gender: GenderType;

  @ApiPropertyOptional()
  isActive?: boolean;

  constructor(user: UserEntity, options?: UserDtoOptions) {
    super(user);
    // this.firstName = user.firstName;
    // this.lastName = user.lastName;
    // this.role = user.role;
    // this.email = user.email;
    // this.avatar = user.avatar;
    // this.phone = user.phone;

    this.name = user.name;
    this.username = user.username;
    this.role = user.role;
    this.phone = user.phone;
    this.address = user.address;
    this.avatar = user.avatar;

    this.isActive = options?.isActive;
  }
}
