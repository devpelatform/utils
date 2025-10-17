/**
 * Domain Constants
 * Provides sets of domain-related constants for URL parsing and validation
 */

/**
 * Common second-level domains used in domain name structures
 * Used for domain parsing, validation, and extraction of root domains
 *
 * @example
 * ```ts
 * import { SECOND_LEVEL_DOMAINS } from '@pelatform/utils';
 *
 * // Check if a domain part is a common second-level domain
 * const isSecondLevelDomain = SECOND_LEVEL_DOMAINS.has('co'); // true
 *
 * // Extract root domain from a URL
 * function getRootDomain(url: string) {
 *   const hostname = new URL(url).hostname;
 *   const parts = hostname.split('.');
 *
 *   // Handle cases like example.co.uk
 *   if (parts.length > 2 && SECOND_LEVEL_DOMAINS.has(parts[parts.length - 2])) {
 *     return parts.slice(-3).join('.');
 *   }
 *
 *   // Handle normal cases like example.com
 *   return parts.slice(-2).join('.');
 * }
 * ```
 */
export const SECOND_LEVEL_DOMAINS = new Set(['com', 'co', 'net', 'org', 'edu', 'gov', 'in']);
