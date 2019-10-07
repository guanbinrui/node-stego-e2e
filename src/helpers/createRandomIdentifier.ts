export const SEED = '0123456789abcdefghijklmnopqrstuvwxyz-+';

export function createRandomIdentifier(size: number) {
  const chars = new Array(size).fill(0);

  for (let i = 0; i < size; i += 1) {
    chars[i] = SEED[Math.round(Math.random() * SEED.length)];
  }
  return chars.join('');
}
