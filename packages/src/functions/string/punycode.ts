// /**
//  * Utility functions for Punycode encoding and decoding
//  * Provides tools for handling internationalized domain names (IDN)
//  */

// import { toASCII, toUnicode } from 'punycode';

// /**
//  * Converts a Punycode string of ASCII symbols to a Unicode string
//  * Useful for displaying internationalized domain names in human-readable form
//  *
//  * @param str - The Punycode string to convert to Unicode
//  * @returns The Unicode representation, empty string for non-string inputs
//  *
//  * @example
//  * ```ts
//  * import { punycode } from '@/utils/functions';
//  *
//  * // Convert Punycode domain to Unicode
//  * punycode('xn--espaol-zwa.com')
//  * // Returns "español.com"
//  *
//  * // Handle non-Punycode input
//  * punycode('example.com')
//  * // Returns "example.com" (unchanged)
//  *
//  * // Handle null or undefined
//  * punycode(null)
//  * // Returns ""
//  *
//  * // Use in UI for displaying domains
//  * const displayDomain = (domain) => {
//  *   return punycode(domain) || 'No domain';
//  * };
//  * ```
//  */
// export function punycode(str?: string | null): string {
//   if (typeof str !== 'string') return '';
//   try {
//     return toUnicode(str);
//   } catch (_) {
//     return str;
//   }
// }

// /**
//  * Converts a Unicode string to a Punycode string of ASCII symbols
//  * Useful for encoding internationalized domain names for network operations
//  *
//  * @param str - The Unicode string to convert to Punycode
//  * @returns The Punycode representation, empty string for non-string inputs
//  *
//  * @example
//  * ```ts
//  * import { punyEncode } from '@/utils/functions';
//  *
//  * // Convert Unicode domain to Punycode
//  * punyEncode('español.com')
//  * // Returns "xn--espaol-zwa.com"
//  *
//  * // Handle regular ASCII input
//  * punyEncode('example.com')
//  * // Returns "example.com" (unchanged)
//  *
//  * // Handle null or undefined
//  * punyEncode(null)
//  * // Returns ""
//  *
//  * // Use for network operations
//  * const fetchFromIDN = async (domain) => {
//  *   const encodedDomain = punyEncode(domain);
//  *   return fetch(`https://${encodedDomain}/api/data`);
//  * };
//  * ```
//  */
// export function punyEncode(str?: string | null): string {
//   if (typeof str !== 'string') return '';
//   return toASCII(str);
// }
