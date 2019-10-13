import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GrayscaleAlgorithm } from '../modules/node-stego/src/grayscale';
import { TransformAlgorithm } from '../modules/node-stego/src/transform';
import {
  DEFAULT_CLIP,
  DEFAULT_COPIES,
  DEFAULT_SIZE,
  DEFAULT_TOLERANCE,
} from '../modules/node-stego/src/constant';
import { MediaType } from '../flag';

export enum SuiteStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  OBSOLETE = 'OBSOLETE',
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

  @Column({ default: MediaType.FB })
  media: string;

  @Column()
  mediaUrl: string;

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
