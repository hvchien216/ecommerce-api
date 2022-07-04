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

export interface IUserEntity extends IAbstractEntity {
  username?: string;

  password?: string;

  role: RoleType;

  name?: string;

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

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    cascade: ['insert'],
  })
  @JoinColumn()
  profile: ProfileEntity;

  @ManyToMany(() => StoreEntity, (store: StoreEntity) => store.employees)
  store: StoreEntity[];

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];

  @OneToMany(() => CartLineEntity, (cartLine) => cartLine.customer, {
    cascade: true,
  })
  cart_details: CartLineEntity[];

  constructor(user?: Partial<UserEntity>) {
    super();
    Object.assign(this, user);
  }
}
