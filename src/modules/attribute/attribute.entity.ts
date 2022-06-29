import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AttributeItemEntity } from '../attribute-item/attribute-item.entity';
import { ProductEntity } from '../product/product.entity';

export interface IAttributeEntity extends IAbstractEntity {
  name: string;
}

@Entity({ name: 'attributes' })
export class AttributeEntity
  extends AbstractEntity
  implements IAttributeEntity
{
  @Column()
  name: string;

  @ManyToOne(() => ProductEntity, (product) => product.attributes)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @OneToMany(() => AttributeItemEntity, (attb) => attb.attributeType, {
    cascade: ['insert', 'update'],
  })
  attribute_items: AttributeItemEntity[];

  constructor(attribute?: Partial<AttributeEntity>) {
    super();
    Object.assign(this, attribute);
  }
}
