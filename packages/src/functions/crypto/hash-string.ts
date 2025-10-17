/**
 * Utility function for cryptographic hashing
 * Provides secure string hashing using the SHA-256 algorithm
 */

/**
 * Hashes a string using the SHA-256 algorithm
 * Uses the Web Crypto API for secure cryptographic operations
 *
 * @param str - The string to hash
 * @returns A Promise that resolves to the hexadecimal representation of the hash
 *
 * @example
 * ```ts
 * import { hashStringSHA256 } from '@/utils/functions';
 *
 * // Basic usage
 * const hash = await hashStringSHA256('hello world');
 * // Returns "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
 *
 * // For password verification (example only - use proper password hashing in production)
 * async function verifyPassword(inputPassword: string, storedHash: string) {
 *   const inputHash = await hashStringSHA256(inputPassword);
 *   return inputHash === storedHash;
 * }
 *
 * // For data integrity verification
 * async function verifyDataIntegrity(data: string, expectedHash: string) {
 *   const actualHash = await hashStringSHA256(data);
 *   return actualHash === expectedHash;
 * }
 * ```
 */
export async function hashStringSHA256(str: string): Promise<string> {
  // Encode the string into bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(str);

  // Hash the data with SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convert the buffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}
