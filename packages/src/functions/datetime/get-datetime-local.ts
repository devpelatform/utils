/**
 * Utility function for formatting dates in HTML datetime-local input format
 * Provides consistent datetime string formatting for form inputs
 */

/**
 * Converts a date to a string format compatible with HTML datetime-local inputs
 * Format returned is YYYY-MM-DDThh:mm (compatible with <input type="datetime-local">)
 *
 * @param timestamp - Optional date to format (defaults to current date/time)
 * @returns A string in datetime-local format (YYYY-MM-DDThh:mm), or empty string if date is invalid
 *
 * @example
 * ```ts
 * // Current date/time in datetime-local format
 * getDateTimeLocal()
 * // Returns something like "2023-06-15T14:30" (current time)
 *
 * // Specific date in datetime-local format
 * getDateTimeLocal(new Date('2023-06-15T14:30:00'))
 * // Returns "2023-06-15T14:30"
 *
 * // With invalid date
 * getDateTimeLocal(new Date('invalid'))
 * // Returns ""
 *
 * // Usage with HTML input
 * // <input
 * //   type="datetime-local"
 * //   value={getDateTimeLocal(startDate)}
 * //   onChange={(e) => setStartDate(new Date(e.target.value))}
 * // />
 * ```
 */
export const getDateTimeLocal = (timestamp?: Date): string => {
  const d = timestamp ? new Date(timestamp) : new Date();
  if (d.toString() === 'Invalid Date') return '';
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .split(':')
    .slice(0, 2)
    .join(':');
};
