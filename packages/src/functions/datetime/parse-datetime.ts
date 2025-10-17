/**
 * Utility function for parsing date strings into Date objects
 * Provides natural language date parsing capabilities
 */

import * as chrono from 'chrono-node';

/**
 * Parses a date string into a Date object using natural language processing
 * Passes through Date objects unchanged
 *
 * @param str - The date string to parse or a Date object to pass through
 * @returns A Date object, or null if parsing fails
 *
 * @example
 * ```ts
 * // Parse natural language date strings
 * parseDateTime('tomorrow at 3pm')
 * // Returns a Date object for tomorrow at 3:00 PM
 *
 * // Parse formal date strings
 * parseDateTime('2023-06-15')
 * // Returns a Date object for June 15, 2023
 *
 * // Parse relative dates
 * parseDateTime('next Friday')
 * // Returns a Date object for next Friday
 *
 * // Pass through existing Date objects
 * const date = new Date('2023-06-15')
 * parseDateTime(date)
 * // Returns the same Date object
 *
 * // Parse time strings
 * parseDateTime('3:30pm')
 * // Returns a Date object for today at 3:30 PM
 *
 * // Parse complex date expressions
 * parseDateTime('3 days after next Monday')
 * // Returns the appropriate Date object
 * ```
 */
export const parseDateTime = (str: Date | string): Date | null => {
  if (str instanceof Date) return str;
  return chrono.parseDate(str);
};
