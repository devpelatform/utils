/**
 * Password hashing and verification utilities for SaaS applications
 * Provides secure password handling using bcrypt with proper salt rounds
 * Includes validation and error handling for production use
 */

import bcrypt from 'bcryptjs';

import { logger } from '../logging';

/**
 * Default salt rounds for bcrypt hashing
 * 12 rounds provides good security while maintaining reasonable performance
 * Higher values increase security but also increase computation time
 */
const DEFAULT_SALT_ROUNDS = 12;

/**
 * Interface for password hashing options
 */
interface HashPasswordOptions {
  /** Number of salt rounds for bcrypt (default: 12) */
  saltRounds?: number;
}

/**
 * Interface for password verification result
 */
interface VerifyPasswordResult {
  /** Whether the password is valid */
  isValid: boolean;
  /** Error message if verification failed */
  error?: string;
}

/**
 * Hashes a password using bcrypt with salt
 *
 * @param password - The plain text password to hash
 * @param options - Hashing options
 * @returns Promise that resolves to the hashed password or null if failed
 *
 * @example
 * ```typescript
 * import { hashPassword } from '@pelatform/utils';
 *
 * // Basic usage
 * const hashedPassword = await hashPassword('userPassword123');
 * if (hashedPassword) {
 *   // Store hashedPassword in database
 *   await saveUser({ email, password: hashedPassword });
 * }
 *
 * // With custom salt rounds
 * const hashedPassword = await hashPassword('userPassword123', {
 *   saltRounds: 14
 * });
 *
 * // Error handling
 * const hashedPassword = await hashPassword('userPassword123');
 * if (!hashedPassword) {
 *   throw new Error('Failed to hash password');
 * }
 * ```
 */
export async function hashPassword(
  password: string,
  options: HashPasswordOptions = {},
): Promise<string | null> {
  // Validate input
  if (!password || typeof password !== 'string') {
    logger.warn('Password hashing: Password must be a non-empty string');
    return null;
  }

  if (password.length < 1) {
    logger.warn('Password hashing: Password cannot be empty');
    return null;
  }

  const { saltRounds = DEFAULT_SALT_ROUNDS } = options;

  // Validate salt rounds
  if (typeof saltRounds !== 'number' || saltRounds < 4 || saltRounds > 20) {
    logger.warn('Password hashing: Salt rounds must be between 4 and 20');
    return null;
  }

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    logger.error('Password hashing: Failed to hash password', { error });
    return null;
  }
}

/**
 * Verifies a password against its hash
 *
 * @param password - The plain text password to verify
 * @param hashedPassword - The hashed password to compare against
 * @returns Promise that resolves to verification result
 *
 * @example
 * ```typescript
 * import { verifyPassword } from '@pelatform/utils';
 *
 * // Basic usage
 * const result = await verifyPassword('userPassword123', storedHashedPassword);
 * if (result.isValid) {
 *   // Password is correct, proceed with login
 *   await loginUser(user);
 * } else {
 *   // Password is incorrect
 *   throw new Error('Invalid credentials');
 * }
 *
 * // With error handling
 * const result = await verifyPassword('userPassword123', storedHashedPassword);
 * if (result.error) {
 *   logger.error('Password verification failed:', result.error);
 *   throw new Error('Authentication error');
 * }
 *
 * // In authentication middleware
 * async function authenticateUser(email: string, password: string) {
 *   const user = await getUserByEmail(email);
 *   if (!user) {
 *     return { success: false, error: 'User not found' };
 *   }
 *
 *   const result = await verifyPassword(password, user.hashedPassword);
 *   if (!result.isValid) {
 *     return { success: false, error: 'Invalid password' };
 *   }
 *
 *   return { success: true, user };
 * }
 * ```
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<VerifyPasswordResult> {
  // Validate inputs
  if (!password || typeof password !== 'string') {
    return {
      isValid: false,
      error: 'Password must be a non-empty string',
    };
  }

  if (!hashedPassword || typeof hashedPassword !== 'string') {
    return {
      isValid: false,
      error: 'Hashed password must be a non-empty string',
    };
  }

  // Basic bcrypt hash format validation
  if (
    !hashedPassword.startsWith('$2a$') &&
    !hashedPassword.startsWith('$2b$') &&
    !hashedPassword.startsWith('$2y$')
  ) {
    return {
      isValid: false,
      error: 'Invalid hash format',
    };
  }

  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return { isValid };
  } catch (error) {
    logger.error('Password verification: Failed to verify password', { error });
    return {
      isValid: false,
      error: 'Password verification failed',
    };
  }
}

/**
 * Checks if a password needs to be rehashed (e.g., due to updated salt rounds)
 *
 * @param hashedPassword - The current hashed password
 * @param targetSaltRounds - The target salt rounds (default: 12)
 * @returns Whether the password needs to be rehashed
 *
 * @example
 * ```typescript
 * import { needsRehash, hashPassword } from '@pelatform/utils';
 *
 * // Check if password needs rehashing during login
 * async function loginUser(email: string, password: string) {
 *   const user = await getUserByEmail(email);
 *   const result = await verifyPassword(password, user.hashedPassword);
 *
 *   if (result.isValid) {
 *     // Check if we need to rehash with updated salt rounds
 *     if (needsRehash(user.hashedPassword, 14)) {
 *       const newHash = await hashPassword(password, { saltRounds: 14 });
 *       if (newHash) {
 *         await updateUserPassword(user.id, newHash);
 *       }
 *     }
 *
 *     return { success: true, user };
 *   }
 *
 *   return { success: false, error: 'Invalid credentials' };
 * }
 * ```
 */
export function needsRehash(
  hashedPassword: string,
  targetSaltRounds: number = DEFAULT_SALT_ROUNDS,
): boolean {
  if (!hashedPassword || typeof hashedPassword !== 'string') {
    return true; // Invalid hash should be rehashed
  }

  try {
    // Extract salt rounds from hash
    const parts = hashedPassword.split('$');
    if (parts.length < 4) {
      return true; // Invalid format
    }

    const currentSaltRounds = parseInt(parts[2], 10);
    return currentSaltRounds !== targetSaltRounds;
  } catch (error) {
    logger.warn('Password rehash check: Failed to parse hash', { error });
    return true; // If we can't parse, assume it needs rehashing
  }
}

/**
 * Generates a secure random password
 *
 * @param length - Length of the password (default: 16, min: 8, max: 128)
 * @param options - Password generation options
 * @returns Generated password string
 *
 * @example
 * ```typescript
 * import { generateSecurePassword } from '@pelatform/utils';
 *
 * // Generate default password (16 characters)
 * const password = generateSecurePassword();
 *
 * // Generate longer password
 * const longPassword = generateSecurePassword(24);
 *
 * // Generate password without symbols
 * const simplePassword = generateSecurePassword(12, {
 *   includeSymbols: false
 * });
 *
 * // For temporary passwords
 * const tempPassword = generateSecurePassword(12);
 * await sendPasswordResetEmail(user.email, tempPassword);
 * ```
 */
export function generateSecurePassword(
  length: number = 16,
  options: {
    includeUppercase?: boolean;
    includeLowercase?: boolean;
    includeNumbers?: boolean;
    includeSymbols?: boolean;
  } = {},
): string {
  const {
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true,
  } = options;

  // Validate length
  const validLength = Math.max(8, Math.min(128, length));

  let charset = '';
  if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (charset.length === 0) {
    // Fallback to alphanumeric if no character sets selected
    charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }

  let password = '';
  for (let i = 0; i < validLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
