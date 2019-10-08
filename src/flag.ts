import { Result } from 'meow';
import { Flags as StegoFlags } from 'node-stego/lib/flag';
import { Options } from '.';

export interface Flags extends StegoFlags {
  name: string;
  pass: string;
  generate: boolean;
  validate: boolean;
}

export function normalizeFlags(flags: Result['flags']) {
  return flags as Flags;
}

export function validateFlags({ name, pass }: Flags) {
  if (!name) {
    return '-n, --name is required';
  }
  if (!pass) {
    return '-p, --pass is required';
  }
  return '';
}

export function flags2Options({
  name = '',
  pass = '',
  generate,
  validate,
}: Flags) {
  return {
    name,
    pass,
    generate,
    validate: generate ? false : validate,
  } as Options;
}
