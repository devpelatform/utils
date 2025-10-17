/**
 * Utility function for formatting date periods/ranges
 * Provides consistent date range formatting with smart year display
 */

import { formatDate } from '../..';

/**
 * Formats a date period (start and end dates) into a readable range string
 * Shows year only when start and end dates are in different years
 *
 * @param d - Object containing period information
 * @param d.periodStart - Start date of the period
 * @param d.periodEnd - End date of the period
 * @param locale - Optional locale string for date formatting (defaults to 'en-US')
 * @returns A formatted date period string, or '-' if dates are missing
 *
 * @example
 * ```ts
 * // For dates in the same year
 * formatPeriod({
 *   periodStart: new Date('2023-01-15'),
 *   periodEnd: new Date('2023-06-30')
 * })
 * // Returns "Jan-Jun"
 *
 * // For dates in different years
 * formatPeriod({
 *   periodStart: new Date('2022-11-01'),
 *   periodEnd: new Date('2023-02-28')
 * })
 * // Returns "Nov 2022-Feb"
 *
 * // With custom locale
 * formatPeriod({
 *   periodStart: new Date('2022-11-01'),
 *   periodEnd: new Date('2023-02-28')
 * }, 'fr-FR')
 * // Returns "nov. 2022-févr."
 *
 * // With missing dates
 * formatPeriod({
 *   periodStart: null,
 *   periodEnd: new Date('2023-02-28')
 * })
 * // Returns "-"
 * ```
 */
export const formatPeriod = (
  d: {
    periodStart?: Date | null;
    periodEnd?: Date | null;
  },
  locale: string = 'en-US',
): string => {
  if (!d.periodStart || !d.periodEnd) {
    return '-';
  }

  return `${formatDate(
    d.periodStart,
    {
      month: 'short',
      year:
        new Date(d.periodStart).getUTCFullYear() === new Date(d.periodEnd).getUTCFullYear()
          ? undefined
          : 'numeric',
      timeZone: 'utc',
    },
    locale,
  )}-${formatDate(
    d.periodEnd,
    {
      month: 'short',
      timeZone: 'utc',
    },
    locale,
  )}`;
};
