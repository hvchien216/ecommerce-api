import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IAbstractEntity {
  id: Uuid;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class AbstractEntity implements IAbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
