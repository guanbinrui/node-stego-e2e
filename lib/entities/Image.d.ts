import { BaseEntity } from 'typeorm';
import { Vendor } from './Vendor';
export declare class Image extends BaseEntity {
    id: number;
    vid: string;
    vendor: Vendor;
}
