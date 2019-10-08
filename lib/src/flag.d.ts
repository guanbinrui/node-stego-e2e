import { Result } from 'meow';
import { Flags as StegoFlags } from 'node-stego/lib/flag';
import { Options } from '.';
export declare enum ActionType {
    GENERATE = "GENERATE",
    VALIDATE = "VALIDATE",
    CENSOR = "CENSOR"
}
export interface Flags extends StegoFlags {
    action: ActionType;
    name: string;
    pass: string;
}
export declare function normalizeFlags(flags: Result['flags']): Flags;
export declare function validateFlags({ name, pass, action }: Flags): "" | "-n, --name is required" | "-p, --pass is required" | "unknown action type";
export declare function flags2Options({ name, pass, action, }: Flags): Options;
