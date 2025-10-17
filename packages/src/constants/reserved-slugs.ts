/**
 * Reserved Slugs Constants
 * Provides a list of reserved slugs that cannot be used for user-generated content
 */

/**
 * Array of reserved slugs that cannot be used as workspace slugs or custom paths
 * These are reserved for system use, existing routes, or to prevent confusion/abuse
 *
 * @example
 * ```ts
 * import { RESERVED_SLUGS } from '@pelatform/utils';
 *
 * // Check if a slug is reserved
 * function isSlugReserved(slug: string) {
 *   return RESERVED_SLUGS.includes(slug.toLowerCase());
 * }
 *
 * // Validate user input for custom workspace slug
 * function validateWorkspaceSlug(slug: string) {
 *   if (RESERVED_SLUGS.includes(slug.toLowerCase())) {
 *     return {
 *       valid: false,
 *       error: 'This slug is reserved. Please choose another one.'
 *     };
 *   }
 *   return { valid: true };
 * }
 *
 * // Generate a unique slug that's not reserved
 * function generateUniqueSlug(baseName: string) {
 *   let slug = baseName.toLowerCase().replace(/\s+/g, '-');
 *
 *   if (RESERVED_SLUGS.includes(slug)) {
 *     // Append a random string or number if the slug is reserved
 *     slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
 *   }
 *
 *   return slug;
 * }
 * ```
 */
export const RESERVED_SLUGS = [
  'va',
  'static',
  'stats',
  'share',
  'robots.txt',
  'proxy',
  'account',
  'api',
  'auth',
  'pricing',
  'about',
  'metatags',
  'blog',
  'changelog',
  'atom',
  'careers',
  'docs',
  'features',
  'contact',
  'terms',
  'privacy',
  'admin',
  'help',
  'new',
  'info',
  'demo',
  'discord',
  'reddit',
  'guides',
  'campaigns',
  'links',
  'workspaces',
  'settings',
  'analytics',
  'invites',
  'new',
  'domains',
  'events',
  'referrals',
  'webhooks',
  'upgrade',
  'wrapped',
  'invoices',
  'onboarding',
  'programs',
  'partners',
  'payouts',
  'commissions',
  'sales',
  'resources',
];
