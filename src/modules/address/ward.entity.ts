import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AddressEntity } from './address.entity';
import { DistrictEntity } from './district.entity';

export interface IWardEntity extends IAbstractEntity {
  name: string;
  district_id: Uuid;
}

@Entity({ name: 'wards' })
export class WardEntity extends AbstractEntity implements IWardEntity {
  @Column()
  name: string;

  @Column()
  district_id: Uuid;

  @ManyToOne(() => DistrictEntity, (district) => district.wards)
  @JoinColumn({ name: 'district_id' })
  district: DistrictEntity;

  @OneToMany(() => AddressEntity, (address) => address.ward)
  addresses: AddressEntity[];

  constructor(ward?: Partial<WardEntity>) {
    super();
    Object.assign(this, ward);
  }
}
