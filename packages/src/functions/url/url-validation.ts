/**
 * URL validation utilities
 * Provides functions for validating URL strings and checking URL validity
 */

/**
 * Checks if a string is a valid URL
 * Uses the URL constructor for validation
 *
 * @param url - The string to check
 * @returns True if the string is a valid URL, false otherwise
 *
 * @example
 * ```typescript
 * import { isValidUrl } from '@pelatform/utils';
 *
 * // Valid URLs
 * isValidUrl('https://example.com'); // true
 * isValidUrl('http://localhost:3000'); // true
 * isValidUrl('ftp://files.example.com'); // true
 *
 * // Invalid URLs
 * isValidUrl('example.com'); // false (missing protocol)
 * isValidUrl('not a url'); // false
 * isValidUrl(''); // false
 * isValidUrl('https://'); // false (incomplete)
 *
 * // Use in form validation
 * function validateUrlInput(input: string) {
 *   if (!isValidUrl(input)) {
 *     return 'Please enter a valid URL';
 *   }
 *   return null;
 * }
 *
 * // Use in data processing
 * const validUrls = urls.filter(isValidUrl);
 * ```
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};
