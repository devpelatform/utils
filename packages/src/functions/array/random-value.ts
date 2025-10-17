/**
 * Utility function for random selection
 * Provides a simple way to select a random element from an array
 */

/**
 * Selects a random element from an array
 * Returns undefined if the array is empty
 *
 * @param values - The array to select a random element from
 * @returns A random element from the array, or undefined if the array is empty
 *
 * @example
 * ```ts
 * import { randomValue } from '@/utils/functions';
 *
 * // Basic usage with strings
 * const colors = ['red', 'green', 'blue', 'yellow'];
 * const randomColor = randomValue(colors);
 * // Returns a random color from the array
 *
 * // With numbers
 * const randomNumber = randomValue([1, 2, 3, 4, 5]);
 * // Returns a random number from the array
 *
 * // With objects
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Charlie' }
 * ];
 * const randomUser = randomValue(users);
 * // Returns a random user object from the array
 *
 * // Handle empty array
 * const empty = [];
 * const result = randomValue(empty);
 * // Returns undefined
 *
 * // Type-safe with generics
 * const randomItem = randomValue<string>(['a', 'b', 'c']);
 * // TypeScript knows this is a string
 * ```
 */
export const randomValue = <T>(values: T[]): T | undefined => {
  if (values.length === 0) return undefined;
  return values[Math.floor(Math.random() * values.length)];
};
