import { AbstractEntity, IAbstractEntity } from '../../common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { RoleType } from '../../constants';
import { ProfileEntity } from '../profile/profile.entity';
import { StoreEntity } from '../store/store.entity';

export interface IUserEntity extends IAbstractEntity {
  username?: string;

  password?: string;

  role: RoleType;

  name?: string;

  isActive?: boolean;
}

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity implements IUserEntity {
  @Column()
  username: string;

  @Column()
  password?: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column()
  name: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    cascade: ['insert'],
  })
  @JoinColumn()
  profile: ProfileEntity;

  @ManyToMany(() => StoreEntity, (store: StoreEntity) => store.employees)
  store: StoreEntity[];

  constructor(user?: Partial<UserEntity>) {
    super();
    Object.assign(this, user);
  }
}
