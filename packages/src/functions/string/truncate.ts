/**
 * Utility function for string truncation
 * Provides a simple way to limit string length with ellipsis
 */

/**
 * Truncates a string to a specified length and adds ellipsis
 * Handles null and undefined values gracefully
 *
 * @param str - The string to truncate
 * @param length - Maximum length of the truncated string (including ellipsis)
 * @returns Truncated string with ellipsis, or null if input is null/undefined
 *
 * @example
 * ```ts
 * import { truncate } from '@/utils/functions';
 *
 * // Basic usage
 * truncate('This is a long string that needs truncation', 20)
 * // Returns "This is a long st..."
 *
 * // String shorter than max length (no truncation)
 * truncate('Short string', 20)
 * // Returns "Short string"
 *
 * // With null input
 * truncate(null, 10)
 * // Returns null
 *
 * // With undefined input
 * truncate(undefined, 10)
 * // Returns null
 *
 * // Display truncated text in UI
 * const displayTitle = (title: string) => {
 *   return truncate(title, 50) || 'Untitled';
 * };
 * ```
 */
export const truncate = (str: string | null | undefined, length: number): string | null => {
  if (!str || str.length <= length) return str ?? null;
  return `${str.slice(0, length - 3)}...`;
};
