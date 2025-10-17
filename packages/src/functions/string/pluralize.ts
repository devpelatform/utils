/**
 * Utility function for pluralizing words
 * Provides simple English pluralization based on count
 */

/**
 * Pluralizes a word based on a count value
 * Returns singular form for count=1, plural form otherwise
 *
 * @param word - The word to pluralize
 * @param count - The count determining whether to use singular or plural form
 * @param options - Optional configuration
 * @param options.plural - Custom plural form (if not provided, 's' is appended)
 * @returns The appropriate singular or plural form based on count
 *
 * @example
 * ```ts
 * import { pluralize } from '@/utils/functions';
 *
 * // Basic usage
 * pluralize('item', 1)
 * // Returns "item"
 *
 * pluralize('item', 2)
 * // Returns "items"
 *
 * // With custom plural form
 * pluralize('category', 1)
 * // Returns "category"
 *
 * pluralize('category', 2, { plural: 'categories' })
 * // Returns "categories"
 *
 * // In a sentence
 * const count = 5;
 * `You have ${count} ${pluralize('message', count)}`
 * // Returns "You have 5 messages"
 * ```
 */
export const pluralize = (
  word: string,
  count: number,
  options: {
    plural?: string;
  } = {},
) => {
  if (count === 1) {
    return word;
  }

  // Use custom plural form if provided, otherwise add 's'
  return options.plural || `${word}s`;
};
