//https://stackoverflow.com/questions/60361397/setting-up-a-one-to-many-relationship-for-a-self-referencing-table
import { AbstractEntity, IAbstractEntity } from '@/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { DistrictEntity } from './district.entity';
import { ProvinceEntity } from './province.entity';
import { WardEntity } from './ward.entity';

export interface IAddressEntity extends IAbstractEntity {
  user_id: Uuid;
  province_id: Uuid;
  district_id: Uuid;
  ward_id: Uuid;
  is_default: boolean;
  street: string;
  // full_address: string;
}

@Entity({ name: 'addresses' })
export class AddressEntity extends AbstractEntity implements IAddressEntity {
  @Column()
  user_id: Uuid;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  province_id: Uuid;

  @ManyToOne(() => ProvinceEntity, (province) => province.addresses)
  @JoinColumn({ name: 'province_id' })
  province: ProvinceEntity;

  @Column()
  district_id: Uuid;

  @ManyToOne(() => DistrictEntity, (district) => district.addresses)
  @JoinColumn({ name: 'district_id' })
  district: DistrictEntity;

  @Column()
  ward_id: Uuid;

  @ManyToOne(() => WardEntity, (ward) => ward.addresses)
  @JoinColumn({ name: 'ward_id' })
  ward: WardEntity;

  @Column()
  is_default: boolean;

  @Column()
  street: string;

  // @Column()
  // full_address: string;

  constructor(address?: Partial<AddressEntity>) {
    super();
    Object.assign(this, address);
  }
}
