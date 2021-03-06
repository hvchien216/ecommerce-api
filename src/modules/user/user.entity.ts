import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import { RoleType } from '@/constants/role-type';
import { ProfileEntity } from '../profile/profile.entity';
import { StoreEntity } from '../store/store.entity';
import { OrderEntity } from '../order/order.entity';
import { CartLineEntity } from '../cart/cart-line.entity';
import { AddressEntity } from '../address/address.entity';

export interface IUserEntity extends IAbstractEntity {
  username?: string;

  password?: string;

  role: RoleType;

  name?: string;

  profile_id: Uuid;

  isActive?: boolean;
}

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity implements IUserEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password?: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column()
  name: string;

  @Column()
  profile_id: Uuid;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    cascade: ['insert'],
  })
  @JoinColumn({
    name: 'profile_id',
  })
  profile: ProfileEntity;

  @ManyToMany(() => StoreEntity, (store: StoreEntity) => store.employees)
  store: StoreEntity[];

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];

  @OneToMany(() => CartLineEntity, (cartLine) => cartLine.customer, {
    cascade: true,
  })
  cart_details: CartLineEntity[];

  @OneToMany(() => AddressEntity, (address) => address.user, {
    cascade: true,
  })
  addresses: AddressEntity[];

  constructor(user?: Partial<UserEntity>) {
    super();
    Object.assign(this, user);
  }
}
