/**
 * UTM parameters utilities
 * Provides functions for handling UTM tracking parameters in URLs
 */

/**
 * Standard UTM parameters and referral tags used in marketing campaigns
 * Provides a type-safe list of recognized UTM parameters
 *
 * @example
 * ```typescript
 * import { UTMTags } from '@pelatform/utils';
 *
 * // Use in type definitions
 * type UTMParams = Partial<Record<typeof UTMTags[number], string>>;
 *
 * // Check if a parameter is a valid UTM tag
 * const isValidUTMTag = (tag: string): boolean =>
 *   UTMTags.includes(tag as any);
 *
 * // Access specific tags
 * console.log(UTMTags[0]); // 'utm_source'
 *
 * // Generate form fields for UTM parameters
 * const utmFields = UTMTags.map(tag => ({
 *   name: tag,
 *   label: tag.replace('utm_', 'UTM ').replace(/\b\w/g, l => l.toUpperCase())
 * }));
 * ```
 */
export const UTMTags = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'ref',
] as const;

/**
 * Metadata for UTM parameters with display names and examples
 * Provides human-readable information about each UTM parameter
 *
 * @example
 * ```typescript
 * import { paramsMetadata } from '@pelatform/utils';
 *
 * // Access parameter metadata
 * const sourceParam = paramsMetadata.find(param => param.key === 'utm_source');
 * console.log(sourceParam);
 * // Returns { display: 'UTM Source', key: 'utm_source', examples: 'google, twitter' }
 *
 * // Generate form fields for UTM parameters
 * const formFields = paramsMetadata.map(param => ({
 *   id: param.key,
 *   label: param.display,
 *   placeholder: `e.g., ${param.examples}`
 * }));
 *
 * // Find a parameter by display name
 * const findParamByDisplay = (display: string) =>
 *   paramsMetadata.find(param => param.display === display);
 *
 * // Create help text for users
 * const helpText = paramsMetadata.map(param =>
 *   `${param.display}: ${param.examples}`
 * ).join('\n');
 * ```
 */
export const paramsMetadata = [
  { display: 'UTM Source', key: 'utm_source', examples: 'google, twitter' },
  { display: 'UTM Medium', key: 'utm_medium', examples: 'social, email' },
  { display: 'UTM Campaign', key: 'utm_campaign', examples: 'summer sale' },
  { display: 'UTM Term', key: 'utm_term', examples: 'blue shoes' },
  { display: 'UTM Content', key: 'utm_content', examples: 'logo link' },
  { display: 'Referral (ref)', key: 'ref', examples: 'google, twitter' },
];

/**
 * Constructs a URL with UTM parameters
 * Adds or updates UTM parameters in a URL, handling empty values
 *
 * @param url - The base URL to add UTM parameters to
 * @param utmParams - Object containing UTM parameters as key-value pairs
 * @returns The URL with UTM parameters added, or empty string if URL is invalid
 *
 * @example
 * ```typescript
 * import { constructURLFromUTMParams } from '@pelatform/utils';
 *
 * // Add UTM parameters to a URL
 * constructURLFromUTMParams('https://example.com', {
 *   utm_source: 'twitter',
 *   utm_medium: 'social',
 *   utm_campaign: 'summer_sale'
 * });
 * // Returns "https://example.com?utm_source=twitter&utm_medium=social&utm_campaign=summer_sale"
 *
 * // Update existing UTM parameters
 * constructURLFromUTMParams('https://example.com?utm_source=google', {
 *   utm_source: 'twitter',
 *   utm_medium: 'social'
 * });
 * // Returns "https://example.com?utm_source=twitter&utm_medium=social"
 *
 * // Remove a UTM parameter by setting it to empty string
 * constructURLFromUTMParams('https://example.com?utm_source=google&utm_medium=cpc', {
 *   utm_medium: ''
 * });
 * // Returns "https://example.com?utm_source=google"
 *
 * // With invalid URL
 * constructURLFromUTMParams('', { utm_source: 'twitter' });
 * // Returns ""
 *
 * // Use in link generation
 * const campaignUrl = constructURLFromUTMParams(baseUrl, {
 *   utm_source: 'newsletter',
 *   utm_medium: 'email',
 *   utm_campaign: 'product_launch'
 * });
 * ```
 */
export const constructURLFromUTMParams = (
  url: string,
  utmParams: Record<string, string>,
): string => {
  if (!url) return '';
  try {
    const newURL = new URL(url);
    for (const [key, value] of Object.entries(utmParams)) {
      if (value === '') {
        newURL.searchParams.delete(key);
      } else {
        newURL.searchParams.set(key, value.replace('+', ' '));
      }
    }
    return newURL.toString();
  } catch (_) {
    return '';
  }
};

/**
 * Removes all UTM parameters from a URL
 * Useful for cleaning URLs before sharing or storing
 *
 * @param url - The URL to remove UTM parameters from
 * @returns The URL without any UTM parameters
 *
 * @example
 * ```typescript
 * import { getUrlWithoutUTMParams } from '@pelatform/utils';
 *
 * // Remove UTM parameters
 * getUrlWithoutUTMParams('https://example.com?utm_source=twitter&utm_medium=social&page=2');
 * // Returns "https://example.com?page=2"
 *
 * // URL without UTM parameters (unchanged)
 * getUrlWithoutUTMParams('https://example.com?page=2&category=shoes');
 * // Returns "https://example.com?page=2&category=shoes"
 *
 * // With invalid URL
 * getUrlWithoutUTMParams('not-a-url');
 * // Returns "not-a-url" (unchanged)
 *
 * // Use for clean sharing URLs
 * const shareUrl = getUrlWithoutUTMParams(window.location.href);
 * navigator.share({ url: shareUrl });
 *
 * // Use for canonical URLs
 * const canonicalUrl = getUrlWithoutUTMParams(currentUrl);
 * document.querySelector('link[rel="canonical"]').href = canonicalUrl;
 *
 * // Use in analytics to group by clean URL
 * const cleanUrl = getUrlWithoutUTMParams(pageUrl);
 * analytics.track('page_view', { clean_url: cleanUrl });
 * ```
 */
export const getUrlWithoutUTMParams = (url: string): string => {
  try {
    const newURL = new URL(url);
    paramsMetadata.forEach((param) => {
      newURL.searchParams.delete(param.key);
    });
    return newURL.toString();
  } catch (_) {
    return url;
  }
};

/**
 * Creates a URL with optional UTM parameters for a specific domain
 * Useful for generating links with tracking parameters
 *
 * @param href - The base URL or path
 * @param domain - The domain to check against
 * @param utmParams - Optional UTM parameters to add to the URL
 * @returns A formatted URL with UTM parameters if applicable
 *
 * @example
 * ```typescript
 * import { createHref, UTMTags } from '@pelatform/utils';
 *
 * // Basic usage
 * createHref('/features', 'example.com');
 * // Returns "https://domain.com/features" (with domain transformation)
 *
 * // With UTM parameters
 * createHref('/features', 'example.com', {
 *   utm_source: 'twitter',
 *   utm_medium: 'social'
 * });
 * // Returns "https://domain.com/features?utm_source=twitter&utm_medium=social"
 *
 * // With special domain case
 * createHref('/features', 'domain.com');
 * // Returns "/features" (unchanged)
 *
 * // With absolute URL
 * createHref('https://example.com/page', 'example.com');
 * // Returns "https://example.com/page"
 *
 * // Use in navigation components
 * const navLinks = [
 *   { href: createHref('/pricing', domain, { utm_source: 'nav' }), label: 'Pricing' },
 *   { href: createHref('/features', domain, { utm_source: 'nav' }), label: 'Features' }
 * ];
 * ```
 */
export const createHref = (
  href: string,
  domain: string,
  // any params, doesn't have to be all of them
  utmParams?: Partial<Record<(typeof UTMTags)[number], string>>,
): string => {
  const url = new URL(`${domain}${href}`);
  if (utmParams) {
    Object.entries(utmParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url.toString();
};
