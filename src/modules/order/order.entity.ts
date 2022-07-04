//https://stackoverflow.com/questions/60361397/setting-up-a-one-to-many-relationship-for-a-self-referencing-table
import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import { OrderStatus } from '@/constants/order-status';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { StoreEntity } from '../store/store.entity';
import { UserEntity } from '../user/user.entity';
import { OrderLineEntity } from './order-line.entity';

export interface IOrderEntity extends IAbstractEntity {
  transaction_id: string;
  customer_id: Uuid;
  customer: UserEntity;
  store_id: Uuid;
  store: StoreEntity;
  status: OrderStatus;
  order_date: Date;
  subtotal: number;
  tax_amount: number;
  total: number;
}

@Entity({ name: 'orders' })
export class OrderEntity extends AbstractEntity implements IOrderEntity {
  @Column()
  transaction_id: string;

  @Column()
  customer_id: Uuid;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: UserEntity;

  @Column()
  store_id: Uuid;

  @ManyToOne(() => StoreEntity, (store) => store.orders)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @Column()
  status: OrderStatus;

  @Column()
  order_date: Date;

  @Column()
  subtotal: number;

  @Column()
  tax_amount: number;

  @Column()
  total: number;

  @OneToMany(() => OrderLineEntity, (orderLine) => orderLine.order, {
    cascade: true,
  })
  details: OrderLineEntity[];

  constructor(order?: Partial<OrderEntity>) {
    super();
    Object.assign(this, order);
  }
}
