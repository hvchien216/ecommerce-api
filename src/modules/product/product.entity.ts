import { AbstractEntity, IAbstractEntity } from '../../common/abstract.entity';
import { Column, Entity, JoinColumn } from 'typeorm';
import { RoleType } from '../../constants';
import { ProfileEntity } from '../profile/profile.entity';

export interface IProductsEntity extends IAbstractEntity {
  name: string;
  desc?: string;
  slug: string;
  thumb?: string;
  code: string;
}

@Entity({ name: 'products' })
export class ProductEntity extends AbstractEntity implements IProductsEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  decs: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  thumb: string;

  @Column()
  code: string;

  constructor(user?: Partial<ProductEntity>) {
    super();
    Object.assign(this, user);
  }
}
