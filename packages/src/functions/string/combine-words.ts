/**
 * Utility function for combining words into a grammatically correct list
 * Provides natural language formatting for arrays of words
 */

/**
 * Combines an array of words into a grammatically correct list
 * Joins words with commas and adds "and" before the last word
 *
 * @param words - Array of words to combine
 * @returns A string with words combined in a natural language format
 *
 * @example
 * ```ts
 * import { combineWords } from '@/utils/functions';
 *
 * // Basic usage
 * combineWords(['apple', 'banana', 'orange'])
 * // Returns "apple, banana and orange"
 *
 * // With two words
 * combineWords(['apple', 'banana'])
 * // Returns "apple and banana"
 *
 * // With one word
 * combineWords(['apple'])
 * // Returns "apple"
 *
 * // With empty array
 * combineWords([])
 * // Returns ""
 * ```
 */
export const combineWords = (words: string[]): string => {
  return (
    words
      .join(', ')
      // final one should be "and" instead of comma
      .replace(/, ([^,]*)$/, ' and $1')
  );
};
