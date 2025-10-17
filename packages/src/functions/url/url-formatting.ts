/**
 * URL formatting utilities
 * Provides functions for formatting URLs and generating URL-friendly slugs
 */

/**
 * Formats a URL for display by removing protocol, www prefix, and trailing slash
 * Creates a cleaner, more user-friendly URL representation
 *
 * @param url - The URL to format
 * @returns A formatted URL string without protocol, www prefix, and trailing slash
 *
 * @example
 * ```typescript
 * import { getPrettyUrl } from '@pelatform/utils';
 *
 * // Remove protocol and www
 * getPrettyUrl('https://www.example.com');
 * // Returns "example.com"
 *
 * // Remove trailing slash
 * getPrettyUrl('https://example.com/');
 * // Returns "example.com"
 *
 * // With path
 * getPrettyUrl('https://www.example.com/path/to/page/');
 * // Returns "example.com/path/to/page"
 *
 * // With subdomain
 * getPrettyUrl('https://api.example.com/v1');
 * // Returns "api.example.com/v1"
 *
 * // With null or undefined
 * getPrettyUrl(null);
 * // Returns ""
 *
 * // Use in UI components
 * function LinkDisplay({ url }: { url: string }) {
 *   return <span className="text-gray-500">{getPrettyUrl(url)}</span>;
 * }
 *
 * // Use in breadcrumbs
 * const breadcrumb = getPrettyUrl(currentUrl).split('/');
 * ```
 */
export const getPrettyUrl = (url?: string | null): string => {
  if (!url) return '';
  // remove protocol (http/https) and www.
  // also remove trailing slash
  return url
    .replace(/(^\w+:|^)\/\//, '')
    .replace('www.', '')
    .replace(/\/$/, '');
};

/**
 * Generates a URL-friendly slug from a given title
 *
 * Converts any string into a clean, URL-safe slug by removing special characters,
 * normalizing unicode, and replacing spaces with hyphens. Perfect for creating
 * SEO-friendly URLs from titles, names, or other text content.
 *
 * @param title - The title to convert into a slug (e.g., "Write a Proposal")
 * @returns A slug string (e.g., "write-a-proposal")
 *
 * @example
 * ```typescript
 * import { getSlug } from '@pelatform/utils';
 *
 * // Basic usage
 * getSlug('Hello World'); // 'hello-world'
 * getSlug('Write a Proposal'); // 'write-a-proposal'
 *
 * // Handles special characters
 * getSlug('Café & Restaurant!'); // 'cafe-restaurant'
 * getSlug('100% Success Rate'); // '100-success-rate'
 *
 * // Handles unicode and diacritics
 * getSlug('Résumé'); // 'resume'
 * getSlug('Naïve Approach'); // 'naive-approach'
 *
 * // Edge cases
 * getSlug(''); // ''
 * getSlug('   '); // ''
 * getSlug('---'); // ''
 * getSlug('Multiple   Spaces'); // 'multiple-spaces'
 *
 * // Use in blog post URLs
 * const blogPost = {
 *   title: 'How to Build a SaaS Application',
 *   slug: getSlug('How to Build a SaaS Application') // 'how-to-build-a-saas-application'
 * };
 *
 * // Use in file naming
 * const fileName = `${getSlug(documentTitle)}.pdf`;
 *
 * // Use in route generation
 * const route = `/blog/${getSlug(post.title)}`;
 * ```
 */
export function getSlug(title: string): string {
  // Return empty string for invalid input
  if (!title || typeof title !== 'string') {
    return '';
  }

  return title
    .toLowerCase() // Convert to lowercase for consistency
    .trim() // Remove leading/trailing whitespace
    .normalize('NFD') // Normalize unicode (e.g., "é" -> "e")
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces/hyphens
    .replaceAll(/\s+/g, '-') // Replace spaces with single hyphen
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}
