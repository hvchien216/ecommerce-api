import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AddressEntity } from './address.entity';
import { ProvinceEntity } from './province.entity';
import { WardEntity } from './ward.entity';

export interface IDistrictEntity extends IAbstractEntity {
  name: string;
  province_id: Uuid;
}

@Entity({ name: 'districts' })
export class DistrictEntity extends AbstractEntity implements IDistrictEntity {
  @Column()
  name: string;

  @Column()
  province_id: Uuid;

  @ManyToOne(() => ProvinceEntity, (province) => province.districts)
  @JoinColumn({ name: 'province_id' })
  province: ProvinceEntity;

  @OneToMany(() => WardEntity, (ward) => ward.district, {
    cascade: true,
  })
  wards: WardEntity[];

  @OneToMany(() => AddressEntity, (address) => address.district)
  addresses: AddressEntity[];

  constructor(district?: Partial<DistrictEntity>) {
    super();
    Object.assign(this, district);
  }
}
