//https://stackoverflow.com/questions/60361397/setting-up-a-one-to-many-relationship-for-a-self-referencing-table
import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from './order.entity';

export interface IOrderLineEntity extends IAbstractEntity {
  quantity: number;
  price: number;
  product_variant_name: string;
}

@Entity({ name: 'order_line' })
export class OrderLineEntity
  extends AbstractEntity
  implements IOrderLineEntity
{
  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  product_variant_name: string;

  @ManyToOne(() => OrderEntity, (order) => order.details)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderLines)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  constructor(orderLine?: Partial<OrderLineEntity>) {
    super();
    Object.assign(this, orderLine);
  }
}
