/**
 * URL conversion utilities
 * Provides functions for converting strings to URLs and creating absolute URLs
 */

// import {
//   ADMIN_DOMAIN,
//   APP_DOMAIN,
//   MAIN_DOMAIN,
//   PORTAL_DOMAIN,
// } from '../../constants';
import { isValidUrl } from './url-validation';

// /**
//  * Constructs an absolute URL based on the base application URL
//  *
//  * Safely combines a base URL with a relative path, handling edge cases
//  * like missing slashes and ensuring proper URL formation.
//  *
//  * @param path - The relative path to append to the base URL
//  * @param context - The context of the base URL (main, app, portal, admin)
//  * @returns A string representing the absolute URL
//  *
//  * @example
//  * ```typescript
//  * import { absoluteUrl } from '@pelatform/utils';
//  *
//  * // With environment variable
//  * const profileUrl = absoluteUrl('/profile/123');
//  * // Result: 'https://example.com/profile/123'
//  *
//  * // With explicit base URL
//  * const apiUrl = absoluteUrl('/v1/users');
//  * // Result: 'https://api.example.com/v1/users'
//  *
//  * // Handles missing slashes
//  * const url1 = absoluteUrl('/path'); // 'https://example.com/path'
//  * const url2 = absoluteUrl('path'); // 'https://example.com/path'
//  *
//  * // Use in API calls
//  * const response = await fetch(absoluteUrl('/api/users'));
//  *
//  * // Use in redirects
//  * router.push(absoluteUrl('/dashboard'));
//  * ```
//  */
// export function absoluteUrl(
//   path: string,
//   context: 'main' | 'app' | 'portal' | 'admin' = 'main',
// ): string {
//   const url =
//     context === 'app'
//       ? APP_DOMAIN
//       : context === 'portal'
//         ? PORTAL_DOMAIN
//         : context === 'admin'
//           ? ADMIN_DOMAIN
//           : MAIN_DOMAIN;
//   const baseUrl = url + '/';

//   if (baseUrl && baseUrl !== '/') {
//     return baseUrl + path;
//   } else {
//     return path;
//   }
// }

/**
 * Attempts to convert a string to a valid URL
 * If the string is not a valid URL but looks like a domain, prepends https://
 *
 * @param str - The string to convert
 * @returns A valid URL string or the original string if conversion fails
 *
 * @example
 * ```typescript
 * import { getUrlFromString } from '@pelatform/utils';
 *
 * // Already valid URL
 * getUrlFromString('https://example.com'); // "https://example.com"
 *
 * // Domain without protocol
 * getUrlFromString('example.com'); // "https://example.com"
 * getUrlFromString('subdomain.example.com'); // "https://subdomain.example.com"
 *
 * // Not a URL
 * getUrlFromString('not a url'); // "not a url" (unchanged)
 * getUrlFromString('just text'); // "just text" (unchanged)
 *
 * // Use in link processing
 * function processUserInput(input: string) {
 *   const url = getUrlFromString(input);
 *   if (isValidUrl(url)) {
 *     return `<a href="${url}">${input}</a>`;
 *   }
 *   return input;
 * }
 * ```
 */
export const getUrlFromString = (str: string): string => {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString();
    }
  } catch (_) {
    // Ignore invalid URLs
  }
  return str;
};

/**
 * Attempts to convert a string to a URL object
 * If the string is not a valid URL but looks like a domain, prepends https://
 *
 * @param str - The string to convert
 * @returns A URL object or null if conversion fails
 *
 * @example
 * ```typescript
 * import { getUrlObjFromString } from '@pelatform/utils';
 *
 * // Already valid URL
 * const url1 = getUrlObjFromString('https://example.com');
 * // Returns URL object for "https://example.com"
 *
 * // Domain without protocol
 * const url2 = getUrlObjFromString('example.com');
 * // Returns URL object for "https://example.com"
 *
 * // Not a URL
 * const url3 = getUrlObjFromString('not a url');
 * // Returns null
 *
 * // Use for URL manipulation
 * const urlObj = getUrlObjFromString('example.com');
 * if (urlObj) {
 *   urlObj.searchParams.set('utm_source', 'newsletter');
 *   console.log(urlObj.toString()); // "https://example.com?utm_source=newsletter"
 * }
 *
 * // Extract URL components
 * const urlObj = getUrlObjFromString('https://api.example.com/v1/users');
 * if (urlObj) {
 *   console.log(urlObj.hostname); // "api.example.com"
 *   console.log(urlObj.pathname); // "/v1/users"
 * }
 * ```
 */
export const getUrlObjFromString = (str: string): URL | null => {
  if (isValidUrl(str)) return new URL(str);
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`);
    }
  } catch (_) {
    // Ignore invalid URLs
  }
  return null;
};

/**
 * Attempts to convert a string to a valid URL, returning null if invalid
 * Similar to getUrlFromString but returns null instead of the original string on failure
 *
 * @param str - The string to convert
 * @returns A valid URL string or null if conversion fails
 *
 * @example
 * ```typescript
 * import { getUrlFromStringIfValid } from '@pelatform/utils';
 *
 * // Already valid URL
 * getUrlFromStringIfValid('https://example.com'); // "https://example.com"
 *
 * // Domain without protocol
 * getUrlFromStringIfValid('example.com'); // "https://example.com"
 *
 * // Not a URL
 * getUrlFromStringIfValid('not a url'); // null
 *
 * // Use in conditional logic
 * const userInput = 'example.com';
 * const validUrl = getUrlFromStringIfValid(userInput);
 * if (validUrl) {
 *   // Process as valid URL
 *   window.open(validUrl, '_blank');
 * } else {
 *   // Handle invalid input
 *   alert('Please enter a valid URL');
 * }
 *
 * // Filter valid URLs from array
 * const inputs = ['example.com', 'not a url', 'https://test.com'];
 * const validUrls = inputs
 *   .map(getUrlFromStringIfValid)
 *   .filter(Boolean); // ['https://example.com', 'https://test.com']
 * ```
 */
export const getUrlFromStringIfValid = (str: string): string | null => {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString();
    }
  } catch (_) {
    // Ignore invalid URLs
  }
  return null;
};
