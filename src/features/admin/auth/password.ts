import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const KEY_LENGTH = 64;

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, KEY_LENGTH).toString('hex');

  return `${salt}:${hash}`;
};

export const verifyPassword = (password: string, passwordHash: string) => {
  const [salt, storedHash] = passwordHash.split(':');

  if (!salt || !storedHash) {
    return false;
  }

  const actualHash = scryptSync(password, salt, KEY_LENGTH);
  const expectedHash = Buffer.from(storedHash, 'hex');
  const actualView = new Uint8Array(actualHash);
  const expectedView = new Uint8Array(expectedHash);

  return (
    actualView.length === expectedView.length &&
    timingSafeEqual(actualView, expectedView)
  );
};
