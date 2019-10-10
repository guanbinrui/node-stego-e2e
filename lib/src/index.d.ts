import { EncodeOptions } from 'node-stego/src';
export interface Options {
    name: string;
    pass: string;
    generate: boolean;
    validate: boolean;
    censor: boolean;
}
export declare function generateSuite({ name, pass }: Options, stegoOptions: EncodeOptions): Promise<void>;
export declare function censorSuite(): Promise<void>;
export declare function validateSuite(): Promise<void>;
