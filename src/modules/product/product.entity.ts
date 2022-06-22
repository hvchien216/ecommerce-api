import { AbstractEntity, IAbstractEntity } from '../../common/abstract.entity';
import { Column, Entity, JoinColumn } from 'typeorm';
import { ProductStatusType, RoleType } from '../../constants';
import { ProfileEntity } from '../profile/profile.entity';

export interface IProductsEntity extends IAbstractEntity {
  title: string;
  description?: string;
  slug: string;
  thumbnail?: string;
  images?: string;
  code: string;
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
  thumbnail: string;

  @Column({ nullable: true })
  images: string;

  @Column({ enum: ProductStatusType, default: ProductStatusType.IN_STOCK })
  status: ProductStatusType;

  @Column()
  code: string;

  constructor(product?: Partial<ProductEntity>) {
    super();
    Object.assign(this, product);
  }
}
