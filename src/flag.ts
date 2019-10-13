import { Result } from 'meow';
import { Flags as StegoFlags } from './modules/node-stego/src/flag';

export enum ActionType {
  GENERATE = 'GENERATE',
  VALIDATE = 'VALIDATE',
  CENSOR = 'CENSOR',
}

export enum MediaType {
  FB = 'FB',
  TWITTER = 'TWITTER',
}

export interface Flags extends StegoFlags {
  name: string;
  pass: string;
  action: ActionType;
  media: MediaType;
}

export interface Options {
  name: string;
  pass: string;
  media: MediaType;
  generate: boolean;
  validate: boolean;
  censor: boolean;
}

export function normalizeFlags(flags: Result['flags']) {
  return flags as Flags;
}

export function validateFlags({ name, pass, action, media }: Flags) {
  if (!name && action === ActionType.GENERATE) {
    return '-n, --name is required';
  }
  if (!pass && action === ActionType.GENERATE) {
    return '-p, --pass is required';
  }
  if (!Object.values(ActionType).includes(action)) {
    return 'unknown action type';
  }
  if (!Object.values(MediaType).includes(media)) {
    return 'unknown media type';
  }
  return '';
}

export function flags2Options({
  name = '',
  pass = '',
  action = ActionType.GENERATE,
  media = MediaType.FB,
}: Flags) {
  return {
    name,
    pass,
    media,
    generate: action === ActionType.GENERATE,
    validate: action === ActionType.VALIDATE,
    censor: action === ActionType.CENSOR,
  } as Options;
}
