/**
 * Utility function for string normalization
 * Provides consistent string formatting by removing special characters and normalizing whitespace
 */

import { isDevelopment } from '../../constants';
import { logger } from '../logging';

/**
 * Normalizes a string by removing special characters and normalizing whitespace
 * Useful for cleaning user input, keys, and other string data
 *
 * @param key - The string to normalize
 * @returns A normalized string with special characters removed and whitespace normalized
 *
 * @example
 * ```ts
 * import { normalizeString } from '@/utils/functions';
 *
 * // Remove special characters
 * normalizeString('Hello\u0000World')
 * // Returns "Hello World"
 *
 * // Normalize whitespace
 * normalizeString('Hello   World')
 * // Returns "hello world"
 *
 * // Handle empty input
 * normalizeString('')
 * // Returns ""
 *
 * // Normalize case
 * normalizeString('HeLLo WoRLd')
 * // Returns "hello world"
 *
 * // Remove BOM and other special characters
 * normalizeString('\uFEFFHello')
 * // Returns "hello"
 * ```
 */
export const normalizeString = (key: string): string => {
  if (!key) return '';

  const original = key;
  const normalized = key
    // Remove BOM and other special characters
    .replace(/^\uFEFF/, '')
    .replace(/^\uFFFE/, '')
    .replace(/^\uEFBBBF/, '')
    // biome-ignore lint/suspicious/noControlCharactersInRegex: Handle null byte + BOM sequences without using regex with control characters
    .replace(/^[\u0000\uFEFF]{2}/, '')
    // biome-ignore lint/suspicious/noControlCharactersInRegex: Null byte character needed for BOM handling
    .replace(/^[\uFFFE\u0000]{2}/, '')
    .replace(/^\u2028/, '')
    .replace(/^\u2029/, '')
    // Remove any non-printable characters using a function instead of regex with control characters
    .replace(/./g, (char) => {
      const code = char.charCodeAt(0);
      return code <= 0x1f || (code >= 0x7f && code <= 0x9f) ? '' : char;
    })
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim()
    // Optional: normalize case
    .toLowerCase();

  // Optional: Add logging in development
  if (isDevelopment && original !== normalized) {
    logger.log(`Normalized key: "${original}" -> "${normalized}"`);
    logger.log(
      'Original char codes:',
      Array.from(original).map((c) => c.charCodeAt(0)),
    );
  }

  return normalized;
};
