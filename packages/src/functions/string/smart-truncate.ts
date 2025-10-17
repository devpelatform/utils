/**
 * Utility functions for smart URL truncation
 * Provides intelligent truncation that preserves important parts of URLs
 */

import { truncate } from './truncate';

/**
 * Truncates a domain name while preserving the TLD
 * Ensures the domain remains recognizable even when shortened
 *
 * @param domain - The domain name to truncate
 * @param maxLength - Maximum length for the truncated domain
 * @returns A truncated domain with preserved TLD
 *
 * @example
 * truncateDomain('verylongdomain.com', 10)
 * // Returns "verylong...com"
 */
const truncateDomain = (domain: string, maxLength: number): string => {
  const parts = domain.split('.');
  const tld = parts.pop() || '';
  const rest = parts.join('.');

  return `${rest.slice(0, maxLength)}...${tld}`;
};

/**
 * Intelligently truncates a URL while preserving important parts
 * Dynamically adjusts based on the length of the domain and path,
 * giving priority to the path and truncating the domain if necessary,
 * while ensuring the domain still shows at least 8 characters
 *
 * @param link - The URL or path to truncate
 * @param maxLength - Maximum length for the truncated result
 * @returns A smartly truncated URL that preserves important parts
 *
 * @example
 * ```ts
 * import { smartTruncate } from '@/utils/functions';
 *
 * // Basic usage
 * smartTruncate('example.com/very/long/path/to/resource', 25)
 * // Returns "exam...com/very/long/path/to"
 *
 * // Short URL (no truncation needed)
 * smartTruncate('example.com/path', 25)
 * // Returns "example.com/path"
 *
 * // Very long domain with short path
 * smartTruncate('verylongdomainname.com/path', 25)
 * // Returns "verylong...com/path"
 *
 * // Very long path with short domain
 * smartTruncate('short.com/very/long/path/to/resource', 25)
 * // Returns "short.com/very/long/path/to"
 * ```
 */
export const smartTruncate = (link: string, maxLength: number): string => {
  if (link.length <= maxLength) {
    return link;
  }

  const [domain, ...pathParts] = link.split('/');
  const path = pathParts.join('/');
  const minDomainLength = 8;

  // calculate max path length
  const maxPathLength = maxLength - minDomainLength;

  // Truncate path
  const truncatedPath = truncate(path, maxPathLength)!;

  // Truncate domain if necessary, preserving TLD
  const truncatedDomain = truncateDomain(domain, maxLength - truncatedPath.length);

  return `${truncatedDomain}/${truncatedPath}`;
};
