import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GrayscaleAlgorithm } from 'node-stego/src/grayscale';
import { TransformAlgorithm } from 'node-stego/src/transform';
import {
  DEFAULT_CLIP,
  DEFAULT_COPIES,
  DEFAULT_SIZE,
  DEFAULT_TOLERANCE,
} from 'node-stego/src/constant';

export enum SuiteStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  QUALIFIED = 'QUALIFIED',
  MALFORMED = 'MALFORMED',
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
}
