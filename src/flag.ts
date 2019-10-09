import { Result } from 'meow';
import { Flags as StegoFlags } from 'node-stego/src/flag';
import { Options } from '.';

export enum ActionType {
  GENERATE = 'GENERATE',
  VALIDATE = 'VALIDATE',
  CENSOR = 'CENSOR',
}

export interface Flags extends StegoFlags {
  action: ActionType;
  name: string;
  pass: string;
}

export function normalizeFlags(flags: Result['flags']) {
  return flags as Flags;
}

export function validateFlags({ name, pass, action }: Flags) {
  if (!name && action === ActionType.GENERATE) {
    return '-n, --name is required';
  }
  if (!pass && action === ActionType.GENERATE) {
    return '-p, --pass is required';
  }
  if (!Object.values(ActionType).includes(action)) {
    return 'unknown action type';
  }
  return '';
}

export function flags2Options({
  name = '',
  pass = '',
  action = ActionType.GENERATE,
}: Flags) {
  return {
    name,
    pass,
    generate: action === ActionType.GENERATE,
    validate: action === ActionType.VALIDATE,
    censor: action === ActionType.CENSOR,
  } as Options;
}
