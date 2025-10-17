/**
 * Utility function for deep object comparison
 * Provides recursive comparison of nested objects and arrays
 */

/**
 * Type definition for the deepEqual function
 * Specifies the function signature for comparing two objects deeply
 */
type DeepEqual = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => boolean;

/**
 * Performs a deep equality check between two objects
 * Recursively compares all nested properties and values
 *
 * @param obj1 - First object to compare
 * @param obj2 - Second object to compare
 * @returns True if objects are deeply equal, false otherwise
 *
 * @example
 * ```ts
 * import { deepEqual } from '@/utils/functions';
 *
 * // Simple objects
 * deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })
 * // Returns true
 *
 * // Different order of keys doesn't matter
 * deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })
 * // Returns true
 *
 * // Nested objects
 * deepEqual(
 *   { a: 1, b: { c: 3, d: 4 } },
 *   { a: 1, b: { c: 3, d: 4 } }
 * )
 * // Returns true
 *
 * // Different values
 * deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })
 * // Returns false
 *
 * // Different structure
 * deepEqual({ a: 1, b: 2 }, { a: 1, c: 2 })
 * // Returns false
 *
 * // Different nesting
 * deepEqual(
 *   { a: 1, b: { c: 3 } },
 *   { a: 1, b: { c: 4 } }
 * )
 * // Returns false
 * ```
 */
export const deepEqual: DeepEqual = (obj1, obj2) => {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }

    const val1 = obj1[key];
    const val2 = obj2[key];

    // If both values are objects, recursively compare them
    if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null) {
      if (!deepEqual(val1 as Record<string, unknown>, val2 as Record<string, unknown>)) {
        return false;
      }
    } else if (val1 !== val2) {
      // For non-object values, use strict equality
      return false;
    }
  }

  return true;
};
