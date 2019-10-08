import { EncodeOptions } from 'node-stego/lib';
export interface Options {
    name: string;
    pass: string;
    generate: boolean;
    validate: boolean;
}
export declare function generateSuite({ name, pass }: Options, stegoOptions: EncodeOptions): Promise<void>;
export declare function validateSuite(stegoOptions: EncodeOptions): Promise<void>;
