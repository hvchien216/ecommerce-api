//https://stackoverflow.com/questions/60361397/setting-up-a-one-to-many-relationship-for-a-self-referencing-table
import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

export interface ICategoryEntity extends IAbstractEntity {
  title: string;

  description: string;
}

@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity implements ICategoryEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  public parent_id?: Uuid;

  @ManyToOne(() => CategoryEntity, (category) => category.parent_id)
  @JoinColumn({ name: 'parent_id' })
  parentCategory: CategoryEntity;

  constructor(category?: Partial<CategoryEntity>) {
    super();
    Object.assign(this, category);
  }
}
