/**
 * Utility functions for billing date calculations
 * Provides tools for determining billing cycles, adjusting for month lengths, etc.
 */

/**
 * Gets the last day of the current month
 *
 * @param referenceDate - Optional reference date (defaults to current date)
 * @returns The number representing the last day of the month (28-31)
 *
 * @example
 * ```ts
 * // If current month is February 2023
 * getLastDayOfMonth()
 * // Returns 28
 *
 * // If current month is January 2023
 * getLastDayOfMonth()
 * // Returns 31
 *
 * // With specific reference date
 * getLastDayOfMonth(new Date('2023-02-15'))
 * // Returns 28
 * ```
 */
export const getLastDayOfMonth = (referenceDate: Date = new Date()): number => {
  const lastDay = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0); // This will give the last day of the current month
  return lastDay.getDate();
};

/**
 * Adjusts the billing cycle start day based on the number of days in the current month
 * Ensures billing cycle start day is valid for months with fewer days
 *
 * @param billingCycleStart - The preferred billing cycle start day (1-31)
 * @param referenceDate - Optional reference date (defaults to current date)
 * @returns An adjusted billing cycle start day that is valid for the current month
 *
 * @example
 * ```ts
 * // If billing cycle starts on the 30th, but current month is February
 * getAdjustedBillingCycleStart(30)
 * // Returns 28 (or 29 in leap years)
 *
 * // If billing cycle starts on the 30th, and current month is January
 * getAdjustedBillingCycleStart(30)
 * // Returns 30 (no adjustment needed)
 *
 * // With specific reference date
 * getAdjustedBillingCycleStart(30, new Date('2023-02-15'))
 * // Returns 28
 * ```
 */
export const getAdjustedBillingCycleStart = (
  billingCycleStart: number,
  referenceDate: Date = new Date(),
): number => {
  const lastDay = getLastDayOfMonth(referenceDate);
  if (billingCycleStart > lastDay) {
    return lastDay;
  } else {
    return billingCycleStart;
  }
};

/**
 * Calculates the start date of the current billing period
 * Based on the billing cycle start day and the current date
 *
 * @param billingCycleStart - The day of the month when billing cycle starts (1-31)
 * @param referenceDate - Optional reference date (defaults to current date)
 * @returns A Date object representing the start of the current billing period
 *
 * @example
 * ```ts
 * // If today is January 15, 2023 and billing cycle starts on the 10th
 * getBillingStartDate(10)
 * // Returns new Date("2023-01-10") (current month's billing start)
 *
 * // If today is January 5, 2023 and billing cycle starts on the 10th
 * getBillingStartDate(10)
 * // Returns new Date("2022-12-10") (previous month's billing start)
 *
 * // With billing cycle start day that exceeds days in some months (e.g., 31)
 * getBillingStartDate(31, new Date('2023-03-15'))
 * // Returns new Date("2023-02-28") (adjusted for February)
 *
 * // With specific reference date
 * getBillingStartDate(15, new Date('2023-01-20'))
 * // Returns new Date("2023-01-15")
 * ```
 */
export const getBillingStartDate = (
  billingCycleStart: number,
  referenceDate: Date = new Date(),
): Date => {
  const today = referenceDate;
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const adjustedBillingCycleStart = getAdjustedBillingCycleStart(billingCycleStart, referenceDate);
  if (currentDay <= adjustedBillingCycleStart) {
    // if the current day is less than the billing cycle start, we need to go back a month
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // if the current month is January, we need to go back to December
    const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear; // if the current month is January, we need to go back a year
    return new Date(lastYear, lastMonth, adjustedBillingCycleStart);
  } else {
    return new Date(currentYear, currentMonth, adjustedBillingCycleStart);
  }
};
