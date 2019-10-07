import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { version as stegoVersion } from 'node-stego/lib/cli';
import { TransformAlgorithm } from 'node-stego/lib/transform';
import { GrayscaleAlgorithm } from 'node-stego/lib/grayscale';
import { Image } from './Image';

@Entity()
export class Suite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  expect: string;

  @Column()
  actual: string;

  @Column()
  url: string;

  @Column()
  pass: string;

  @Column({ default: 3 })
  copies: number;

  @Column({ default: 8 })
  size: number;

  @Column({ default: 128 })
  tolerance: number;

  @Column({ default: stegoVersion })
  version: string;

  @Column()
  transformAlgorithm: TransformAlgorithm;

  @Column()
  grayscaleAlgorithm: GrayscaleAlgorithm;

  @OneToOne(() => Image)
  image: Image;
}
