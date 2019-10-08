import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Image } from './Image';
import { TransformAlgorithm } from 'node-stego/lib/transform';
import { GrayscaleAlgorithm } from 'node-stego/lib/grayscale';
import {
  DEFAULT_CLIP,
  DEFAULT_COPIES,
  DEFAULT_SIZE,
  DEFAULT_TOLERANCE,
} from 'node-stego/lib/constant';

export enum SuiteStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  NOT_DEPEND = 'NOT_DEPEND',
}

@Entity()
export class Suite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: SuiteStatus.NOT_DEPEND })
  status: SuiteStatus;

  @Column()
  fbUrl: string;

  @Column()
  vendorUrl: string;

  @Column()
  text: string;

  @Column()
  pass: string;

  @Column({ default: DEFAULT_CLIP })
  clip: number;

  @Column({ default: DEFAULT_COPIES })
  copies: number;

  @Column({ default: DEFAULT_SIZE })
  size: number;

  @Column({ default: DEFAULT_TOLERANCE })
  tolerance: number;

  @Column({ default: '' })
  version: string;

  @Column({ type: 'varchar' })
  transformAlgorithm: TransformAlgorithm;

  @Column({ type: 'varchar', default: GrayscaleAlgorithm.NONE })
  grayscaleAlgorithm: GrayscaleAlgorithm;

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;
}