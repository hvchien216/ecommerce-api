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
import { AttributeItemEntity } from '../attribute-item/attribute-item.entity';
import { CartLineEntity } from '../cart/cart-line.entity';
import { ProductEntity } from '../product/product.entity';

export interface IProductVariantEntity extends IAbstractEntity {
  name: string;
  quantity: number;
  price: number;
  product: ProductEntity;
  deletedAt: Date;
}

@Entity({ name: 'product_variants' })
export class ProductVariantEntity
  extends AbstractEntity
  implements IProductVariantEntity
{
  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => ProductEntity, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(
    () => AttributeItemEntity,
    (attbItem) => attbItem.product_variants,
    {
      cascade: true,
    },
  )
  @JoinTable({
    name: 'product_variants_attribute_item',
    joinColumn: {
      name: 'attribute_item_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_variant_id',
      referencedColumnName: 'id',
    },
  })
  attributeItems: AttributeItemEntity[];

  @OneToMany(() => CartLineEntity, (cartLine) => cartLine.product_variant)
  cartLines: CartLineEntity[];

  constructor(productVariant?: Partial<ProductVariantEntity>) {
    super();
    Object.assign(this, productVariant);
  }
}
