/**
 * Utility function for string capitalization
 * Provides consistent text formatting for display purposes
 */

/**
 * Capitalizes the first character of each word in a string
 * Handles null or undefined values by returning them unchanged
 *
 * @param str - The string to capitalize (can be undefined or null)
 * @returns The capitalized string, or the original value if not a string
 *
 * @example
 * ```ts
 * // Basic usage
 * capitalize('hello world')
 * // Returns "Hello World"
 *
 * // Single word
 * capitalize('javascript')
 * // Returns "Javascript"
 *
 * // Already capitalized text remains unchanged
 * capitalize('Hello World')
 * // Returns "Hello World"
 *
 * // Handles null or undefined
 * capitalize(null)
 * // Returns null
 *
 * capitalize(undefined)
 * // Returns undefined
 *
 * // Mixed case
 * capitalize('javaScript is COOL')
 * // Returns "Javascript Is COOL"
 * ```
 */
export function capitalize(str?: string | null): string | undefined | null {
  if (!str || typeof str !== 'string') return str;
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
