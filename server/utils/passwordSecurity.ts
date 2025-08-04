import crypto from 'crypto';

// Generate a secure random salt
export const generateSalt = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Hash password with salt using SHA-256
export const hashPassword = (password: string, salt: string): string => {
  return crypto.createHash('sha256').update(password + salt).digest('hex');
};

// Verify password against stored hash
export const verifyPassword = (password: string, salt: string, storedHash: string): boolean => {
  const hash = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
};

// Generate a secure token
export const generateSecureToken = (): string => {
  return crypto.randomBytes(64).toString('hex');
};

// Encrypt sensitive data
export const encryptData = (data: string, key: string): string => {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// Decrypt sensitive data
export const decryptData = (encryptedData: string, key: string): string => {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}; 