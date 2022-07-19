import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductStatusType } from '../../constants';
import { AttributeEntity } from '../attribute/attribute.entity';
import { CartLineEntity } from '../cart/cart-line.entity';
import { CategoryEntity } from '../category/category.entity';
import { OrderLineEntity } from '../order/order-line.entity';
import { ProductVariantEntity } from '../product-variant/product-variant.entity';
import { StoreEntity } from '../store/store.entity';

export interface IProductsEntity extends IAbstractEntity {
  title: string;
  description?: string;
  slug: string;
  image?: string;
  images?: string;
  price: number;
  price_min: number;
  price_max: number;
  code: string;
  store_id: Uuid;
  status: ProductStatusType;
}

@Entity({ name: 'products' })
export class ProductEntity extends AbstractEntity implements IProductsEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  images: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  price_min: number;

  @Column({ default: 0 })
  price_max: number;

  @Column({ enum: ProductStatusType, default: ProductStatusType.DEACTIVATED })
  status: ProductStatusType;

  @Column({ nullable: true })
  code: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => ProductVariantEntity,
    (productVariant) => productVariant.product,
    { cascade: true },
  )
  variants: ProductVariantEntity[];

  @OneToMany(() => AttributeEntity, (attb) => attb.product, {
    cascade: true,
  })
  attributes: AttributeEntity[];

  @Column()
  store_id: Uuid;

  @ManyToOne(() => StoreEntity, (store) => store.products)
  @JoinColumn({ name: 'store_id' })
  storeOwner: StoreEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.products, {
    cascade: true,
  })
  @JoinTable({
    name: 'product_categories',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: CategoryEntity[];
  // @ManyToOne(() => CategoryEntity, (category) => category.parentCategory)
  // @JoinColumn({ name: 'category_id' })
  // category: CategoryEntity;

  @OneToMany(() => OrderLineEntity, (orderLine) => orderLine.product)
  orderLines: OrderLineEntity[];

  @OneToMany(() => CartLineEntity, (cartLine) => cartLine.product)
  cartLines: CartLineEntity[];

  constructor(product?: Partial<ProductEntity>) {
    super();
    Object.assign(this, product);
  }
}
