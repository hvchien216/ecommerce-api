import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AddressEntity } from './address.entity';
import { DistrictEntity } from './district.entity';

export interface IProvinceEntity extends IAbstractEntity {
  name: string;
}

@Entity({ name: 'provinces' })
export class ProvinceEntity extends AbstractEntity implements IProvinceEntity {
  @Column()
  name: string;

  @OneToMany(() => DistrictEntity, (district) => district.province, {
    cascade: true,
  })
  districts: DistrictEntity[];

  @OneToMany(() => AddressEntity, (address) => address.province)
  addresses: AddressEntity[];

  constructor(province?: Partial<ProvinceEntity>) {
    super();
    Object.assign(this, province);
  }
}
