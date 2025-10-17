/**
 * Utility functions for domain name operations
 * Provides tools for domain validation, parsing, and generation
 */

import slugify from '@sindresorhus/slugify';

import { ccTLDs, SECOND_LEVEL_DOMAINS, SPECIAL_APEX_DOMAINS } from '../../constants';
import { isValidUrl } from './url-validation';

/**
 * Generates a domain name from a given string
 * Attempts to create a short, memorable domain using various strategies
 *
 * @param name - The name to generate a domain from
 * @param extension - The domain extension to use (default: "link")
 * @returns A generated domain name, or empty string if generation fails
 *
 * @example
 * ```ts
 * import { generateDomainFromName } from '@/utils/functions';
 *
 * // Basic usage with default extension (.link)
 * generateDomainFromName('My Cool Project')
 * // Returns "mycoolproject.link"
 *
 * // With custom extension
 * generateDomainFromName('My Cool Project', 'com')
 * // Returns "mycoolproject.com"
 *
 * // With country code TLD if possible
 * generateDomainFromName('Canada')
 * // Returns "canad.ca"
 *
 * // With vowels removed if needed
 * generateDomainFromName('Digital', 'io')
 * // Returns "dgtl.io"
 * ```
 */
export const generateDomainFromName = (name: string, extension: string = 'link'): string => {
  const normalizedName = slugify(name, { separator: '' });
  if (normalizedName.length < 3) {
    return '';
  }
  if (ccTLDs.has(normalizedName.slice(-2))) {
    return `${normalizedName.slice(0, -2)}.${normalizedName.slice(-2)}`;
  }
  // remove vowels
  const devowel = normalizedName.replace(/[aeiou]/g, '');
  if (devowel.length >= 3 && ccTLDs.has(devowel.slice(-2))) {
    return `${devowel.slice(0, -2)}.${devowel.slice(-2)}`;
  }

  const shortestString = [normalizedName, devowel].reduce((a, b) => (a.length < b.length ? a : b));

  return `${shortestString}.${extension}`;
};

/**
 * Regular expression for validating domain names
 * Ensures domains follow standard naming conventions
 *
 * @example
 * ```ts
 * import { validDomainRegex } from '@/utils/functions';
 *
 * // Check if a domain is valid
 * const isValidDomain = (domain: string) => validDomainRegex.test(domain);
 *
 * isValidDomain('example.com') // true
 * isValidDomain('sub.example.co.uk') // true
 * isValidDomain('invalid domain') // false
 * ```
 */
export const validDomainRegex = new RegExp(
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
);

/**
 * Regular expression for validating URL slugs
 * Ensures slugs only contain alphanumeric characters and hyphens
 *
 * @example
 * ```ts
 * import { validSlugRegex } from '@/utils/functions';
 *
 * // Check if a slug is valid
 * const isValidSlug = (slug: string) => validSlugRegex.test(slug);
 *
 * isValidSlug('my-page') // true
 * isValidSlug('about123') // true
 * isValidSlug('invalid_slug') // false (contains underscore)
 * ```
 */
export const validSlugRegex = new RegExp(/^[a-zA-Z0-9-]+$/);

/**
 * Extracts the subdomain from a full domain name
 *
 * @param name - The full domain name (e.g., "sub.example.com")
 * @param apexName - The apex domain (e.g., "example.com")
 * @returns The subdomain or null if there is no subdomain
 *
 * @example
 * ```ts
 * import { getSubdomain } from '@/utils/functions';
 *
 * // Get subdomain
 * getSubdomain('app.example.com', 'example.com')
 * // Returns "app"
 *
 * // Multiple levels of subdomains
 * getSubdomain('dev.app.example.com', 'example.com')
 * // Returns "dev.app"
 *
 * // No subdomain
 * getSubdomain('example.com', 'example.com')
 * // Returns null
 * ```
 */
export const getSubdomain = (name: string, apexName: string): string | null => {
  if (name === apexName) return null;
  return name.slice(0, name.length - apexName.length - 1);
};

/**
 * Extracts the apex (root) domain from a URL
 * Handles special cases like second-level TLDs and website builder domains
 *
 * @param url - The URL to extract the apex domain from
 * @returns The apex domain, or empty string if extraction fails
 *
 * @example
 * ```ts
 * import { getApexDomain } from '@/utils/functions';
 *
 * // Basic usage
 * getApexDomain('https://example.com/page')
 * // Returns "example.com"
 *
 * // With subdomain
 * getApexDomain('https://app.example.com')
 * // Returns "example.com"
 *
 * // With second-level TLD
 * getApexDomain('https://example.co.uk')
 * // Returns "example.co.uk"
 *
 * // With special apex domain
 * getApexDomain('https://myproject.vercel.app')
 * // Returns "myproject.vercel.app"
 *
 * // Special case for YouTube
 * getApexDomain('https://youtu.be/12345')
 * // Returns "youtube.com"
 * ```
 */
export const getApexDomain = (url: string): string => {
  let domain = '';
  try {
    // replace any custom scheme (e.g. notion://) with https://
    // use the URL constructor to get the hostname
    domain = new URL(url.replace(/^[a-zA-Z]+:\/\//, 'https://')).hostname;
  } catch (_) {
    return '';
  }
  if (domain === 'youtu.be') return 'youtube.com';

  const parts = domain.split('.');
  if (parts.length > 2) {
    if (
      // if this is a second-level TLD (e.g. co.uk, .com.ua, .org.tt), we need to return the last 3 parts
      (SECOND_LEVEL_DOMAINS.has(parts[parts.length - 2]) && ccTLDs.has(parts[parts.length - 1])) ||
      // if it's a special subdomain for website builders (e.g. weathergpt.vercel.app/)
      SPECIAL_APEX_DOMAINS.has(parts.slice(-2).join('.'))
    ) {
      return parts.slice(-3).join('.');
    }
    // otherwise, it's a subdomain (e.g. pelatform.vercel.app), so we return the last 2 parts
    return parts.slice(-2).join('.');
  }
  // if it's a normal domain (e.g. pelatform.com), we return the domain
  return domain;
};

/**
 * Removes the "www." prefix from a domain if present
 * Attempts to parse the input as a URL if it's not already a valid URL
 *
 * @param url - The URL or domain to process
 * @returns The domain without "www." prefix, or null if parsing fails
 *
 * @example
 * ```ts
 * import { getDomainWithoutWWW } from '@/utils/functions';
 *
 * // With www prefix
 * getDomainWithoutWWW('https://www.example.com')
 * // Returns "example.com"
 *
 * // Without www prefix
 * getDomainWithoutWWW('https://example.com')
 * // Returns "example.com"
 *
 * // With just domain (no protocol)
 * getDomainWithoutWWW('www.example.com')
 * // Returns "example.com"
 *
 * // Invalid input
 * getDomainWithoutWWW('not a domain')
 * // Returns null
 * ```
 */
export const getDomainWithoutWWW = (url: string): string | null | undefined => {
  if (isValidUrl(url)) {
    return new URL(url).hostname.replace(/^www\./, '');
  }
  try {
    if (url.includes('.') && !url.includes(' ')) {
      return new URL(`https://${url}`).hostname.replace(/^www\./, '');
    }
  } catch (_) {
    return null;
  }
};
