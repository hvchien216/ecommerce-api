//https://stackoverflow.com/questions/60361397/setting-up-a-one-to-many-relationship-for-a-self-referencing-table
import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from '../product/product.entity';

export interface ICategoryEntity extends IAbstractEntity {
  title: string;

  description: string;

  parentCategory: CategoryEntity;

  childCategories?: CategoryEntity[];
}

@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity implements ICategoryEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  public parent_id?: Uuid;

  // @ManyToOne(() => CategoryEntity, (category) => category.parent_id)
  // @JoinColumn({ name: 'parent_id' })
  // parentCategory: CategoryEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.childCategories)
  @JoinColumn({ name: 'parent_id' })
  parentCategory: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parentCategory)
  childCategories: CategoryEntity[];

  @ManyToMany(
    () => ProductEntity,
    (product: ProductEntity) => product.categories,
  )
  products: ProductEntity[];

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(category?: Partial<CategoryEntity>) {
    super();
    Object.assign(this, category);
  }
}
