/**
 * Utility function for calculating billing or subscription periods
 * Provides date range calculations based on a specific day of the month
 */

/**
 * Calculates the first and last day of a period based on a specific day of the month
 * Useful for determining billing cycles, subscription periods, etc.
 *
 * @param day - The day of the month that marks the boundary of the period (1-31)
 * @param referenceDate - Optional reference date (defaults to current date)
 * @returns An object containing the first and last day of the period
 *
 * @example
 * ```ts
 * // If today is May 20, 2023 and the billing day is the 15th
 * getFirstAndLastDay(15)
 * // Returns:
 * // {
 * //   firstDay: new Date("2023-05-15T00:00:00"), // May 15, 2023
 * //   lastDay: new Date("2023-06-14T00:00:00")   // June 14, 2023
 * // }
 *
 * // If today is May 10, 2023 and the billing day is the 15th
 * getFirstAndLastDay(15)
 * // Returns:
 * // {
 * //   firstDay: new Date("2023-04-15T00:00:00"), // April 15, 2023
 * //   lastDay: new Date("2023-05-14T00:00:00")   // May 14, 2023
 * // }
 *
 * // With a specific reference date
 * getFirstAndLastDay(15, new Date('2023-05-20'))
 * // Returns the same result as the first example
 * ```
 */
export const getFirstAndLastDay = (
  day: number,
  referenceDate: Date = new Date(),
): { firstDay: Date; lastDay: Date } => {
  const today = referenceDate;
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  if (currentDay >= day) {
    // if the current day is greater than target day, it means that we just passed it
    return {
      firstDay: new Date(currentYear, currentMonth, day),
      lastDay: new Date(currentYear, currentMonth + 1, day - 1),
    };
  } else {
    // if the current day is less than target day, it means that we haven't passed it yet
    const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear; // if the current month is January, we need to go back a year
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // if the current month is January, we need to go back to December
    return {
      firstDay: new Date(lastYear, lastMonth, day),
      lastDay: new Date(currentYear, currentMonth, day - 1),
    };
  }
};
