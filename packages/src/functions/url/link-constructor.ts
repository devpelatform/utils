/**
 * Utility functions for constructing URLs and links
 * Provides tools for building URLs with various options and formats
 */

// import {
//   ADMIN_DOMAIN,
//   APP_DOMAIN,
//   MAIN_DOMAIN,
//   PORTAL_DOMAIN,
// } from '../../constants';

// import { punycode } from '../string';

/**
 * Constructs a URL with various options including punycode support
 * Handles special cases like root paths and optional search parameters
 *
 * @param options - Configuration options for the URL
 * @param options.domain - The domain name (optional)
 * @param options.key - The path key or slug (optional)
 * @param options.pretty - Whether to remove protocol for display purposes (optional)
 * @param options.searchParams - URL search parameters to include (optional)
 * @returns A formatted URL string, or empty string if no domain is provided
 *
 * @example
 * ```ts
 * import { linkConstructor } from '@/utils/functions';
 *
 * // Basic usage
 * linkConstructor({ domain: 'example.com', key: 'page' })
 * // Returns "https://example.com/page"
 *
 * // Root path (no key)
 * linkConstructor({ domain: 'example.com' })
 * // Returns "https://example.com"
 *
 * // With special _root key
 * linkConstructor({ domain: 'example.com', key: '_root' })
 * // Returns "https://example.com"
 *
 * // With search parameters
 * linkConstructor({
 *   domain: 'example.com',
 *   key: 'search',
 *   searchParams: { q: 'query', page: '1' }
 * })
 * // Returns "https://example.com/search?q=query&page=1"
 *
 * // Pretty format (without protocol)
 * linkConstructor({ domain: 'example.com', key: 'about', pretty: true })
 * // Returns "example.com/about"
 *
 * // With internationalized domain name
 * linkConstructor({ domain: 'mañana.com', key: 'café' })
 * // Returns "https://xn--maana-pta.com/xn--caf-dma" (punycode encoded)
 * ```
 */
export function linkConstructor({
  domain,
  key,
  pretty,
  searchParams,
}: {
  domain?: string;
  key?: string;
  pretty?: boolean;
  searchParams?: Record<string, string>;
}) {
  if (!domain) {
    return '';
  }

  let url = `https://${domain}${key && key !== '_root' ? `/${key}` : ''}`;
  // let url = `https://${punycode(domain)}${key && key !== '_root' ? `/${punycode(key)}` : ''}`;

  if (searchParams) {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      search.set(key, value);
    }
    url += `?${search.toString()}`;
  }

  return pretty ? url.replace(/^https?:\/\//, '') : url;
}

/**
 * Simplified version of linkConstructor with fewer options
 * Creates a basic URL without punycode encoding or search parameters
 *
 * @param options - Configuration options for the URL
 * @param options.domain - The domain name
 * @param options.key - The path key or slug
 * @returns A formatted URL string
 *
 * @example
 * ```ts
 * import { linkConstructorSimple } from '@/utils/functions';
 *
 * // Basic usage
 * linkConstructorSimple({ domain: 'example.com', key: 'page' })
 * // Returns "https://example.com/page"
 *
 * // With special _root key
 * linkConstructorSimple({ domain: 'example.com', key: '_root' })
 * // Returns "https://example.com"
 * ```
 */
export function linkConstructorSimple({ domain, key }: { domain: string; key: string }) {
  return `https://${domain}${key === '_root' ? '' : `/${key}`}`;
}

// /**
//  * Returns the base URL of the site based on environment variables.
//  *
//  * @param context - The context of the base URL (main, app, portal, admin)
//  * @returns A string representing the base URL of the site.
//  *
//  * @example
//  * ```ts
//  * const url = baseUrl();
//  * // "https://example.com" (from env)
//  * // or "https://your-vercel-project.vercel.app"
//  * // or "http://localhost:3000"
//  * ```
//  */
// export function baseUrl(context: 'main' | 'app' | 'portal' | 'admin' = 'main') {
//   const url =
//     context === 'app'
//       ? APP_DOMAIN
//       : context === 'portal'
//         ? PORTAL_DOMAIN
//         : context === 'admin'
//           ? ADMIN_DOMAIN
//           : MAIN_DOMAIN;
//   return url;
// }
