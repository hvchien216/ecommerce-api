import { AbstractEntity, IAbstractEntity } from '../../common/abstract.entity';
import { Column, Entity } from 'typeorm';

export interface IStoreEntity extends IAbstractEntity {
  name?: string;

  bio?: string;

  slug: string;
}

@Entity({ name: 'stores' })
export class StoreEntity extends AbstractEntity implements IStoreEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  bio: string;

  @Column({
    unique: true,
  })
  slug: string;

  constructor(store?: Partial<StoreEntity>) {
    super();
    Object.assign(this, store);
  }
}
