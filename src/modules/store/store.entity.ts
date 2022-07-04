import { AbstractEntity, IAbstractEntity } from '../../common/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ProductEntity } from '../product/product.entity';
import { CartLineEntity } from '../cart/cart-line.entity';
import { OrderEntity } from '../order/order.entity';

export interface IStoreEntity extends IAbstractEntity {
  name?: string;

  bio?: string;

  slug: string;
}

@Entity({ name: 'stores' })
export class StoreEntity extends AbstractEntity implements IStoreEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  bio: string;

  @Column({
    unique: true,
  })
  slug: string;

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.store, {
    cascade: true,
  })
  @JoinTable()
  employees: UserEntity[];

  @OneToMany(
    () => ProductEntity,
    (product: ProductEntity) => product.storeOwner,
    {
      cascade: true,
    },
  )
  products: ProductEntity[];

  @OneToMany(() => CartLineEntity, (cartLine) => cartLine.store)
  cartLines: CartLineEntity[];

  @OneToMany(() => OrderEntity, (order) => order.store)
  orders: OrderEntity[];

  constructor(store?: Partial<StoreEntity>) {
    super();
    Object.assign(this, store);
  }
}
