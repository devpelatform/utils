/**
 * Utility function for smart date and time formatting
 * Provides context-aware datetime formatting based on date proximity to current time
 */

/**
 * Formats a date intelligently - shows year for past years, shows time for current year
 *
 * @param datetime - The date to format (can be Date object or string)
 * @param options - Optional Intl.DateTimeFormat options to customize formatting
 * @param locale - Optional locale string (defaults to 'en-US')
 * @returns A formatted date string with contextual information
 *
 * @example
 * ```ts
 * // For a date in the current year (assuming current year is 2023)
 * formatDateTimeSmart(new Date('2023-06-15'))
 * // Returns "Jun 15, 10:30 AM" (with time)
 *
 * // For a date in a previous year
 * formatDateTimeSmart(new Date('2022-06-15'))
 * // Returns "Jun 15, 2022" (with year instead of time)
 *
 * // With custom options
 * formatDateTimeSmart(new Date('2022-06-15'), {
 *   weekday: 'long'
 * })
 * // Returns "Wednesday, Jun 15, 2022"
 *
 * // With custom locale
 * formatDateTimeSmart(new Date('2022-06-15'), undefined, 'fr-FR')
 * // Returns "15 juin 2022"
 *
 * // Current year with custom locale
 * formatDateTimeSmart(new Date('2023-06-15'), undefined, 'de-DE')
 * // Returns "15. Jun, 10:30" (format depends on locale)
 * ```
 */
export const formatDateTimeSmart = (
  datetime: Date | string,
  options?: Intl.DateTimeFormatOptions,
  locale: string = 'en-US',
): string => {
  const date = new Date(datetime);
  const now = new Date();

  return new Date(datetime).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    // if date is in previous year, show year
    // else, hide year, show time
    ...(date.getUTCFullYear() !== now.getUTCFullYear()
      ? { year: 'numeric' }
      : {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
    ...options,
  });
};
