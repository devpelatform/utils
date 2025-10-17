/**
 * Year extraction utilities for datetime operations
 * Provides functions for getting current year information
 */

/**
 * Utility function to get the current year as a number
 * Provides a simple way to retrieve the current year from the system date.
 * Commonly used for copyright notices, date ranges, and year-based filtering.
 *
 * @returns The current year as a four-digit number (e.g., 2025)
 *
 * @example
 * ```ts
 * import { getCurrentYear } from '@/utils/functions';
 *
 * // Get the current year
 * const year = getCurrentYear();
 * // Returns: 2025 (if the current year is 2025)
 *
 * // Usage in a copyright footer
 * const Footer = () => (
 *   <footer>
 *     &copy; {getCurrentYear()} My Company. All rights reserved.
 *   </footer>
 * );
 *
 * // Usage in date ranges
 * const yearRange = `2020-${getCurrentYear()}`;
 * // Returns: "2020-2025"
 *
 * // Usage in form validation
 * const isValidYear = (inputYear: number) => {
 *   const currentYear = getCurrentYear();
 *   return inputYear >= 1900 && inputYear <= currentYear;
 * };
 *
 * // Usage in analytics
 * const currentYearData = analytics.filter(item =>
 *   item.year === getCurrentYear()
 * );
 * ```
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}
