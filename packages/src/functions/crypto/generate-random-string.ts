/**
 * Utility function for generating cryptographically secure random strings
 * Provides secure random string generation for tokens, IDs, and other security-sensitive uses
 */

import { randomBytes } from 'node:crypto';

/**
 * Generates a cryptographically secure random string of specified length
 * Uses Node.js crypto module for secure random number generation
 *
 * @param length - The length of the random string to generate
 * @returns A random string consisting of uppercase letters and numbers
 *
 * @example
 * ```ts
 * import { generateRandomString } from '@/utils/functions';
 *
 * // Generate a 6-character random string
 * const verificationCode = generateRandomString(6);
 * // Example output: "A7B3C9"
 *
 * // Generate a longer random string for tokens
 * const apiToken = generateRandomString(32);
 * // Example output: "X7F9A2B5C8D1E4F7G0H3I6J9K2L5M8N1"
 *
 * // Use as unique identifiers
 * const uniqueId = generateRandomString(12);
 * // Example output: "B7C9D1E3F5G7"
 * ```
 */
export function generateRandomString(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomBytesArray = randomBytes(length);
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytesArray[i] % charset.length;
    result += charset[randomIndex];
  }

  return result;
}
