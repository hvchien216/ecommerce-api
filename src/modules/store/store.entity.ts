import { AbstractEntity, IAbstractEntity } from '../../common/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';

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

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.store, {
    cascade: true,
  })
  @JoinTable()
  employees: UserEntity[];

  constructor(store?: Partial<StoreEntity>) {
    super();
    Object.assign(this, store);
  }
}
