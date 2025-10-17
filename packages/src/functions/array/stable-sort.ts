/**
 * Utility function for stable array sorting
 * Provides a way to sort arrays while preserving the original order of equal elements
 */

/**
 * Sorts an array using the specified compare function, preserving the order
 * of elements that compare equally (stable sort)
 *
 * @param arr - The array to sort
 * @param compare - The comparison function that returns negative, zero, or positive values
 * @returns A new sorted array with the original order of equal elements preserved
 *
 * @example
 * ```ts
 * import { stableSort } from '@/utils/functions';
 *
 * // Basic usage with numbers
 * const numbers = [3, 1, 4, 1, 5, 9];
 * const sortedNumbers = stableSort(numbers, (a, b) => a - b);
 * // Returns [1, 1, 3, 4, 5, 9] with the first "1" still coming before the second "1"
 *
 * // With objects and multiple sort criteria
 * const users = [
 *   { name: 'Alice', role: 'admin', id: 1 },
 *   { name: 'Bob', role: 'user', id: 2 },
 *   { name: 'Charlie', role: 'user', id: 3 },
 *   { name: 'David', role: 'admin', id: 4 }
 * ];
 *
 * // Sort by role first, then by original order
 * const sortedUsers = stableSort(users, (a, b) =>
 *   a.role.localeCompare(b.role)
 * );
 * // The order of users with the same role is preserved
 * ```
 */
export const stableSort = <T>(arr: T[], compare: (a: T, b: T) => number): T[] =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);
