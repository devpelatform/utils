/**
 * Domain Constants
 * Provides sets of domain-related constants for URL parsing and validation
 */

/**
 * Special apex domains that require special handling
 * These domains are typically used for hosting services where users get subdomains
 *
 * @example
 * ```ts
 * import { SPECIAL_APEX_DOMAINS } from '@pelatform/utils';
 *
 * // Check if a domain is a special hosting domain
 * const isSpecialDomain = SPECIAL_APEX_DOMAINS.has('vercel.app'); // true
 *
 * // Determine if a hostname is a user subdomain on a special apex domain
 * function isUserSubdomain(hostname: string) {
 *   const parts = hostname.split('.');
 *   if (parts.length < 2) return false;
 *
 *   const possibleApexDomain = parts.slice(-2).join('.');
 *   return SPECIAL_APEX_DOMAINS.has(possibleApexDomain);
 * }
 *
 * // Extract username from special domains
 * function extractUsername(hostname: string) {
 *   const parts = hostname.split('.');
 *   const possibleApexDomain = parts.slice(-2).join('.');
 *
 *   if (SPECIAL_APEX_DOMAINS.has(possibleApexDomain)) {
 *     return parts.slice(0, -2).join('.');
 *   }
 *   return null;
 * }
 * ```
 */
export const SPECIAL_APEX_DOMAINS = new Set([
  'my.id',
  'github.io',
  'vercel.app',
  'now.sh',
  'pages.dev',
  'webflow.io',
  'netlify.app',
  'fly.dev',
  'web.app',
]);
