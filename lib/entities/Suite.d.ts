import { BaseEntity } from 'typeorm';
import { Image } from './Image';
import { TransformAlgorithm } from 'node-stego/lib/transform';
import { GrayscaleAlgorithm } from 'node-stego/lib/grayscale';
export declare enum SuiteStatus {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL",
    NOT_DEPEND = "NOT_DEPEND"
}
export declare class Suite extends BaseEntity {
    id: number;
    status: SuiteStatus;
    fbUrl: string;
    vendorUrl: string;
    text: string;
    pass: string;
    clip: number;
    copies: number;
    size: number;
    tolerance: number;
    version: string;
    transformAlgorithm: TransformAlgorithm;
    grayscaleAlgorithm: GrayscaleAlgorithm;
    image: Image;
}
