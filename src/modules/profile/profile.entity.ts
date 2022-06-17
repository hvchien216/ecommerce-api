import { AbstractEntity } from '@/common/abstract.entity';
import { GenderType } from '@/constants/gener-type';
import { Column, Entity, OneToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

export interface IProfileEntity extends AbstractEntity {
  gender?: GenderType;
  phone?: string;
  avatar?: string;
  email?: string;
  address?: string;
}

@Entity({ name: 'profile' })
export class ProfileEntity extends AbstractEntity implements IProfileEntity {
  @Column({ type: 'enum', enum: GenderType, default: GenderType.MALE })
  gender: GenderType;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;

  constructor(profile?: Partial<ProfileEntity>) {
    super();
    Object.assign(this, profile);
  }
}
