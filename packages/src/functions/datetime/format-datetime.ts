/**
 * Utility function for formatting date and time in a consistent way
 * Provides human-readable datetime formatting with customizable options
 */

/**
 * Formats a date and time into a localized string representation
 *
 * @param datetime - The date to format (can be Date object or string)
 * @param options - Optional Intl.DateTimeFormat options to customize formatting
 * @param locale - Optional locale string (defaults to 'en-US')
 * @returns A formatted date and time string, or empty string if date is invalid
 *
 * @example
 * ```ts
 * // Basic usage with defaults
 * formatDateTime(new Date('2023-01-15T14:30:00'))
 * // Returns "Jan 15, 2023, 2:30 PM"
 *
 * // With a date string
 * formatDateTime('2023-01-15T14:30:00')
 * // Returns "Jan 15, 2023, 2:30 PM"
 *
 * // With custom options
 * formatDateTime(new Date('2023-01-15T14:30:00'), {
 *   weekday: 'long',
 *   second: 'numeric'
 * })
 * // Returns "Sunday, Jan 15, 2023, 2:30:00 PM"
 *
 * // With 24-hour format
 * formatDateTime(new Date('2023-01-15T14:30:00'), {
 *   hour12: false
 * })
 * // Returns "Jan 15, 2023, 14:30"
 *
 * // With custom locale
 * formatDateTime(new Date('2023-01-15T14:30:00'), undefined, 'de-DE')
 * // Returns "15. Jan 2023, 14:30"
 *
 * // With invalid date
 * formatDateTime('invalid-date')
 * // Returns ""
 * ```
 */
export const formatDateTime = (
  datetime: Date | string,
  options?: Intl.DateTimeFormatOptions,
  locale: string = 'en-US',
): string => {
  if (datetime.toString() === 'Invalid Date') return '';
  return new Date(datetime).toLocaleTimeString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    ...options,
  });
};
