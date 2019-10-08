import { Result } from 'meow';
import { Flags as StegoFlags } from 'node-stego/lib/flag';
import { Options } from '.';
export interface Flags extends StegoFlags {
    name: string;
    pass: string;
    generate: boolean;
    validate: boolean;
}
export declare function normalizeFlags(flags: Result['flags']): Flags;
export declare function validateFlags({ name, pass }: Flags): "" | "-n, --name is required" | "-n, --pass is required";
export declare function flags2Options({ name, pass, generate, validate, }: Flags): Options;
