import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { AttributeEntity } from '../attribute/attribute.entity';
import { ProductVariantEntity } from '../product-variant/product-variant.entity';

export interface IAttributeItemEntity extends IAbstractEntity {
  value: string;
}

@Entity({ name: 'attribute_item' })
export class AttributeItemEntity
  extends AbstractEntity
  implements IAttributeItemEntity
{
  @Column()
  value: string;

  @ManyToOne(() => AttributeEntity, (attb_item) => attb_item.attribute_items)
  @JoinColumn({ name: 'attribute_id' })
  attributeType: AttributeEntity;

  @ManyToMany(
    () => ProductVariantEntity,
    (productVariant) => productVariant.attributeItems,
  )
  product_variants: ProductVariantEntity[];

  constructor(attributeItem?: Partial<AttributeItemEntity>) {
    super();
    Object.assign(this, attributeItem);
  }
}
