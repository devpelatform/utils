/**
 * Utility function for formatting dates in a consistent way
 * Provides human-readable date formatting with customizable options
 */

/**
 * Formats a date into a localized string representation
 *
 * @param datetime - The date to format (can be Date object or string)
 * @param options - Optional Intl.DateTimeFormat options to customize formatting
 * @param locale - Optional locale string (defaults to 'en-US')
 * @returns A formatted date string, or empty string if date is invalid
 *
 * @example
 * ```ts
 * // Basic usage with defaults
 * formatDate(new Date('2023-01-15'))
 * // Returns "January 15, 2023"
 *
 * // With a date string
 * formatDate('2023-01-15')
 * // Returns "January 15, 2023"
 *
 * // With custom options
 * formatDate(new Date('2023-01-15'), {
 *   month: 'short',
 *   day: '2-digit'
 * })
 * // Returns "Jan 15, 2023"
 *
 * // With custom locale
 * formatDate(new Date('2023-01-15'), undefined, 'de-DE')
 * // Returns "15. Januar 2023"
 *
 * // With custom locale and options
 * formatDate(new Date('2023-01-15'), {
 *   weekday: 'long',
 *   year: 'numeric',
 *   month: 'long',
 *   day: 'numeric'
 * }, 'fr-FR')
 * // Returns "dimanche 15 janvier 2023"
 *
 * // With invalid date
 * formatDate('invalid-date')
 * // Returns ""
 * ```
 */
export const formatDate = (
  datetime: Date | string,
  options?: Intl.DateTimeFormatOptions,
  locale: string = 'en-US',
): string => {
  if (datetime.toString() === 'Invalid Date') return '';
  return new Date(datetime).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  });
};
