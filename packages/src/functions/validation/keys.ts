/**
 * Utility functions for key validation and management
 * Provides tools for validating and checking special keys in the system
 */

/**
 * Regular expression for validating keys
 * Allows letters, numbers, '-', '_', '/', '.', and emojis
 *
 * @example
 * ```ts
 * import { validKeyRegex } from '@/utils/functions';
 *
 * // Check if a key is valid
 * const isValidKey = (key: string) => validKeyRegex.test(key);
 *
 * isValidKey('user-profile') // true
 * isValidKey('path/to/resource') // true
 * isValidKey('emoji-😊-key') // true
 * isValidKey('<invalid>') // false
 * ```
 */
export const validKeyRegex = new RegExp(/^[0-9A-Za-z_\u0080-\uFFFF/\p{Emoji}.-]+$/u);

/**
 * Checks if a key is unsupported by the system
 * Validates against excluded prefixes and suffixes
 * Special case for '_root' which is always supported
 *
 * @param key - The key to check
 * @returns True if the key is unsupported, false otherwise
 *
 * @example
 * ```ts
 * import { isUnsupportedKey } from '@/utils/functions';
 *
 * isUnsupportedKey('normal-key') // false
 * isUnsupportedKey('_root') // false (special case)
 * isUnsupportedKey('.well-known/acme-challenge') // true
 * isUnsupportedKey('script.php') // true
 * ```
 */
export const isUnsupportedKey = (key: string): boolean => {
  // special case for root domain links
  if (key === '_root') {
    return false;
  }
  const excludedPrefix = ['.well-known'];
  const excludedSuffix = ['.php', '.php7'];
  return (
    excludedPrefix.some((prefix) => key.startsWith(prefix)) ||
    excludedSuffix.some((suffix) => key.endsWith(suffix))
  );
};

/**
 * Checks if a key is globally reserved by the system
 * These keys are reserved for special system files and cannot be used by users
 *
 * @param key - The key to check
 * @returns True if the key is globally reserved, false otherwise
 *
 * @example
 * ```ts
 * import { isReservedKeyGlobal } from '@/utils/functions';
 *
 * isReservedKeyGlobal('favicon.ico') // true
 * isReservedKeyGlobal('robots.txt') // true
 * isReservedKeyGlobal('custom-page') // false
 *
 * // Validate user input
 * function validateUserKey(key: string) {
 *   if (isReservedKeyGlobal(key)) {
 *     return 'This key is reserved for system use';
 *   }
 *   return null; // Valid
 * }
 * ```
 */
export const isReservedKeyGlobal = (key: string): boolean => {
  const reservedKeys = [
    'favicon.ico',
    'sitemap.xml',
    'robots.txt',
    'manifest.webmanifest',
    'manifest.json',
    'apple-app-site-association',
  ];
  return reservedKeys.includes(key);
};
