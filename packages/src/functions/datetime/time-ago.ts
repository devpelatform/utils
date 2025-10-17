/**
 * Utility function for displaying relative time in a human-readable format
 * Provides context-aware time formatting based on elapsed time
 */

import ms from 'ms';

/**
 * Formats a timestamp into a human-readable relative time string
 *
 * @param timestamp - The date to format (can be Date object or null)
 * @param options - Formatting options
 * @param options.withAgo - Whether to append "ago" to the relative time (default: false)
 * @param options.neverText - Text to display for null timestamps (default: "Never")
 * @param options.justNowText - Text to display for timestamps less than 1 second ago (default: "Just now")
 * @param options.agoText - Text to append for relative times when withAgo is true (default: "ago")
 * @param locale - Optional locale string for date formatting (defaults to 'en-US')
 * @returns A formatted relative time string
 *
 * @example
 * ```ts
 * // For recent timestamps (less than 1 second ago)
 * timeAgo(new Date())
 * // Returns "Just now"
 *
 * // For timestamps within the last 23 hours
 * timeAgo(new Date(Date.now() - 1000 * 60 * 30))
 * // Returns "30m" (30 minutes)
 *
 * // With "ago" suffix
 * timeAgo(new Date(Date.now() - 1000 * 60 * 30), { withAgo: true })
 * // Returns "30m ago"
 *
 * // For older timestamps (more than 23 hours)
 * timeAgo(new Date(Date.now() - 1000 * 60 * 60 * 24 * 2))
 * // Returns "Jun 15" (date format)
 *
 * // For timestamps in previous years
 * timeAgo(new Date('2022-06-15'))
 * // Returns "Jun 15, 2022"
 *
 * // With custom locale
 * timeAgo(new Date('2022-06-15'), {}, 'fr-FR')
 * // Returns "15 juin 2022"
 *
 * // For null timestamp
 * timeAgo(null)
 * // Returns "Never"
 *
 * // With custom text for internationalization
 * timeAgo(null, { neverText: "Nunca" })
 * // Returns "Nunca"
 *
 * timeAgo(new Date(), { justNowText: "Ahora mismo" })
 * // Returns "Ahora mismo"
 *
 * timeAgo(new Date(Date.now() - 1000 * 60 * 30), { withAgo: true, agoText: "atrás" })
 * // Returns "30m atrás"
 *
 * // Full internationalization example
 * timeAgo(new Date(Date.now() - 1000 * 60 * 5), {
 *   withAgo: true,
 *   justNowText: "Baru saja",
 *   agoText: "yang lalu",
 *   neverText: "Tidak pernah"
 * }, 'id-ID')
 * // Returns "5m yang lalu"
 * ```
 */
export const timeAgo = (
  timestamp: Date | null,
  {
    withAgo,
    neverText = 'Never',
    justNowText = 'Just now',
    agoText = 'ago',
  }: {
    withAgo?: boolean;
    neverText?: string;
    justNowText?: string;
    agoText?: string;
  } = {},
  locale: string = 'en-US',
): string => {
  if (!timestamp) return neverText;
  const diff = Date.now() - new Date(timestamp).getTime();
  if (diff < 1000) {
    // less than 1 second
    return justNowText;
  } else if (diff > 82800000) {
    // more than 23 hours – similar to how Twitter displays timestamps
    return new Date(timestamp).toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric',
      year: new Date(timestamp).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  }
  return `${ms(diff)}${withAgo ? ` ${agoText}` : ''}`;
};
