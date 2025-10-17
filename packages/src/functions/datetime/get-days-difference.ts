/**
 * Utility function for calculating the difference between dates in days
 * Provides accurate day count calculations for date ranges
 */

/**
 * Calculates the number of days between two dates
 * Returns the absolute difference regardless of which date comes first
 *
 * @param startDate - The first date in the comparison
 * @param endDate - The second date in the comparison
 * @returns The number of days between the two dates (always positive)
 *
 * @example
 * ```ts
 * // Basic usage
 * getDaysDifference(
 *   new Date('2023-01-01'),
 *   new Date('2023-01-10')
 * )
 * // Returns 9
 *
 * // Order of dates doesn't matter (result is always positive)
 * getDaysDifference(
 *   new Date('2023-01-10'),
 *   new Date('2023-01-01')
 * )
 * // Returns 9
 *
 * // With time components
 * getDaysDifference(
 *   new Date('2023-01-01T10:00:00'),
 *   new Date('2023-01-02T08:00:00')
 * )
 * // Returns 1 (rounds up to the nearest day)
 *
 * // Across month boundaries
 * getDaysDifference(
 *   new Date('2023-01-28'),
 *   new Date('2023-02-05')
 * )
 * // Returns 8
 * ```
 */
export const getDaysDifference = (startDate: Date, endDate: Date): number => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
