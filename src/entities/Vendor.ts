import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Image } from './Image';

export enum VendorType {
  PEXELS = 'PEXELS',
  UNSPLASH = 'UNSPLASH',
  INS = 'INS',
}

@Entity()
export class Vendor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: VendorType;

  @OneToMany(() => Image, image => image.vendor)
  images: Array<Image>;
}
