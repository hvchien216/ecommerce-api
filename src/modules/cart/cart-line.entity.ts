import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductVariantEntity } from '../product-variant/product-variant.entity';
import { ProductEntity } from '../product/product.entity';
import { StoreEntity } from '../store/store.entity';
import { UserEntity } from '../user/user.entity';

export interface ICartLineEntity extends IAbstractEntity {
  quantity: number;
  user_id: Uuid;
  product_id: Uuid;
  product_variant_id: Uuid;
  store_id: Uuid;
}

@Entity({ name: 'cart_line' })
export class CartLineEntity extends AbstractEntity implements ICartLineEntity {
  @Column()
  quantity: number;

  @Column()
  user_id: Uuid;

  @Column()
  product_id: Uuid;

  @Column()
  product_variant_id: Uuid;

  @Column()
  store_id: Uuid;

  @ManyToOne(() => UserEntity, (user) => user.cart_details)
  @JoinColumn({ name: 'user_id' })
  customer: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.cartLines)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(
    () => ProductVariantEntity,
    (product_variant) => product_variant.cartLines,
  )
  @JoinColumn({ name: 'product_variant_id' })
  product_variant: ProductVariantEntity;

  @ManyToOne(() => StoreEntity, (store) => store.cartLines)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  constructor(cartLine?: Partial<CartLineEntity>) {
    super();
    Object.assign(this, cartLine);
  }
}
