/**
 * Utility function for formatting time in a consistent way
 * Provides human-readable time formatting with customizable options
 */

/**
 * Formats a time as a readable string in "Hour:Minute AM/PM" format
 *
 * Extracts and formats only the time portion from a date object or string.
 * Uses 12-hour format with AM/PM indicators for better readability.
 *
 * @param date - A date object or string to format
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns A string formatted as "Hour:Minute AM/PM"
 *
 * @example
 * ```typescript
 * // Using default locale
 * formatTime(new Date()); // "2:30 PM"
 *
 * // Using specific locale
 * formatTime(new Date(), 'id-ID'); // "14.30"
 * formatTime(new Date(), 'de-DE'); // "14:30"
 *
 * // With date string
 * formatTime('2023-12-25T14:30:00'); // "2:30 PM"
 * ```
 */
export const formatTime = (date: Date | string, locale: string = 'en-US'): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(parsedDate);
};
