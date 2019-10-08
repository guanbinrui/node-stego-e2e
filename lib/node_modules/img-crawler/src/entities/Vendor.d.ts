import { BaseEntity } from 'typeorm';
import { Image } from './Image';
export declare enum VendorType {
    PEXELS = "PEXELS",
    UNSPLASH = "UNSPLASH",
    INS = "INS"
}
export declare class Vendor extends BaseEntity {
    id: number;
    name: VendorType;
    images: Array<Image>;
}
