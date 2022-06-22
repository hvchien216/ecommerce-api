import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ProductStatusType } from '../../constants';
import { CategoryEntity } from '../category/category.entity';
import { StoreEntity } from '../store/store.entity';

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

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => StoreEntity, (store) => store.products)
  @JoinColumn({ name: 'store_id' })
  storeOwner: StoreEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.parentCategory)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  constructor(product?: Partial<ProductEntity>) {
    super();
    Object.assign(this, product);
  }
}
